// src/grupos/grupos.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { GruposRepository } from './repository/grupos.repository';
import { Grupo } from './schema/grupos.schema';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema/user.schema';

@Injectable()
export class GruposService {
  constructor(
    private readonly gruposRepository: GruposRepository,
    private readonly usersService: UsersService,
  ) {}

  private isObjectId(ref: string): boolean {
    return Types.ObjectId.isValid(ref);
  }

  async removeMember(groupId: string, memberRef: string): Promise<Grupo> {
    const grupo = await this.gruposRepository.findOne(groupId);

    let memberIdToRemove: string | null = null;

    // Se é um ObjectId, usa diretamente
    if (this.isObjectId(memberRef)) {
      memberIdToRemove = memberRef;
    } else {
      // Se é um email, busca o usuário
      const email = this.normalizeRef(memberRef);
      const user = await this.usersService.findByEmail(email);
      if (user) {
        memberIdToRemove = String(user._id);
      }
    }

    if (!memberIdToRemove) {
      throw new NotFoundException(`Membro "${memberRef}" não encontrado`);
    }

    // Remove das duas listas: membros e admins
    const updatedMembros = grupo.membros.filter(
      (id) => id !== memberIdToRemove,
    );
    const updatedAdmins = grupo.grupoAdmins.filter(
      (id) => id !== memberIdToRemove,
    );

    return this.gruposRepository.update(groupId, {
      membros: updatedMembros,
      grupoAdmins: updatedAdmins,
    });
  }

  private normalizeRef(ref: string): string {
    return this.isObjectId(ref) ? ref : ref.trim().toLowerCase();
  }

  async create(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    const membrosRef = [...(createGrupoDto.membros ?? [])];
    const adminsRef = [...(createGrupoDto.grupoAdmins ?? [])];

    if (membrosRef.length === 0 && adminsRef.length === 0) {
      throw new BadRequestException(
        'membros e/ou grupoAdmins devem conter ao menos um ID ou e-mail',
      );
    }

    const refs = Array.from(new Set([...membrosRef, ...adminsRef]));
    const refToId = new Map<string, string>();

    for (const refOriginal of refs) {
      if (this.isObjectId(refOriginal)) {
        refToId.set(refOriginal, refOriginal);
        continue;
      }

      const email = this.normalizeRef(refOriginal);

      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`Usuário "${refOriginal}" não encontrado`);
      }

      refToId.set(refOriginal, String(user._id));
    }

    const membrosIds = membrosRef.map((r) => refToId.get(r)!);
    const grupoAdminsIds = adminsRef.map((r) => refToId.get(r)!);

    const payload: CreateGrupoDto = {
      ...createGrupoDto,
      membros: membrosIds,
      grupoAdmins: grupoAdminsIds,
    };

    return this.gruposRepository.create(payload);
  }

  async findAll(): Promise<Grupo[]> {
    return this.gruposRepository.findAll();
  }

  async findOne(id: string): Promise<Grupo> {
    return this.gruposRepository.findOne(id);
  }

  async update(id: string, updateGrupoDto: UpdateGrupoDto): Promise<Grupo> {
    return this.gruposRepository.update(id, updateGrupoDto);
  }

  async remove(id: string): Promise<Grupo> {
    return this.gruposRepository.remove(id);
  }

  async findByUserEmail(email: string): Promise<Grupo[]> {
    const user = await this.usersService.findByEmail(
      email.trim().toLowerCase(),
    );
    if (!user) {
      throw new NotFoundException(`Usuário "${email}" não encontrado`);
    }

    return this.gruposRepository.findByMemberId(String(user._id));
  }

  async getMembersWithDetails(
    groupId: string,
  ): Promise<Array<{ user: User; isAdmin: boolean }>> {
    const grupo = await this.gruposRepository.findOne(groupId);

    const membersWithDetails = await Promise.all(
      grupo.membros.map(async (memberId) => {
        const user = await this.usersService.findOne(memberId);
        if (!user) {
          throw new NotFoundException(
            `Usuário com ID ${memberId} não encontrado`,
          );
        }

        return {
          user,
          isAdmin:
            Array.isArray(grupo.grupoAdmins) &&
            grupo.grupoAdmins.includes(memberId),
        };
      }),
    );

    return membersWithDetails;
  }

  async addMembers(groupId: string, newMembers: string[]): Promise<Grupo> {
    const grupo = await this.gruposRepository.findOne(groupId);

    const newMemberIds: string[] = [];

    for (const memberRef of newMembers) {
      if (this.isObjectId(memberRef)) {
        const user = await this.usersService.findOne(memberRef);
        if (!user) {
          throw new NotFoundException(
            `Usuário com ID "${memberRef}" não encontrado`,
          );
        }
        newMemberIds.push(memberRef);
        continue;
      }

      const email = this.normalizeRef(memberRef);
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(
          `Usuário com email "${memberRef}" não encontrado`,
        );
      }

      newMemberIds.push(String(user._id));
    }

    const currentMemberIds = grupo.membros || [];
    const allMemberIds = [...currentMemberIds, ...newMemberIds];
    const uniqueMemberIds = Array.from(new Set(allMemberIds));

    return this.gruposRepository.update(groupId, {
      membros: uniqueMemberIds,
    });
  }
}
