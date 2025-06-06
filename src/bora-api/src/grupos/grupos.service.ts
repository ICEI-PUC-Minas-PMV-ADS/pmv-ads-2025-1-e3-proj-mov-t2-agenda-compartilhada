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

  private normalizeRef(ref: string): string {
    return this.isObjectId(ref) ? ref : ref.trim().toLowerCase();
  }

  async removeMember(groupId: string, memberRef: string): Promise<Grupo> {
    console.log('Service - removeMember called with:', { groupId, memberRef });

    const grupo = await this.gruposRepository.findOne(groupId);

    let memberIdToRemove: string | null = null;

    // Se é um ObjectId, usa diretamente
    if (this.isObjectId(memberRef)) {
      console.log('Member ref is ObjectId:', memberRef);
      memberIdToRemove = memberRef;
    } else {
      // Se é um email, busca o usuário
      const email = this.normalizeRef(memberRef);
      console.log('Looking for user with email:', email);
      const user = await this.usersService.findByEmail(email);
      if (user) {
        memberIdToRemove = String(user._id);
        console.log('Found user, ID:', memberIdToRemove);
      }
    }

    if (!memberIdToRemove) {
      throw new NotFoundException(`Membro "${memberRef}" não encontrado`);
    }

    // Usar o método do repository que usa operadores MongoDB
    console.log('Removing member with ID:', memberIdToRemove);
    return this.gruposRepository.removeMember(groupId, memberIdToRemove);
  }

  async create(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    console.log('Service - create group called with:', createGrupoDto);

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

    console.log('Creating group with payload:', payload);
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
    console.log('Service - getMembersWithDetails called for group:', groupId);

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

    console.log('Returning members with details:', membersWithDetails.length);
    return membersWithDetails;
  }

  async addMembers(groupId: string, newMembers: string[]): Promise<Grupo> {
    console.log('Service - addMembers called with:', { groupId, newMembers });

    const grupo = await this.gruposRepository.findOne(groupId);
    console.log('Found group:', grupo.nome);

    const newMemberIds: string[] = [];

    for (const memberRef of newMembers) {
      console.log('Processing member ref:', memberRef);

      if (this.isObjectId(memberRef)) {
        console.log('Member ref is ObjectId, finding user by ID');
        const user = await this.usersService.findOne(memberRef);
        if (!user) {
          throw new NotFoundException(
            `Usuário com ID "${memberRef}" não encontrado`,
          );
        }
        newMemberIds.push(memberRef);
        console.log('Added user by ID:', user.name);
        continue;
      }

      const email = this.normalizeRef(memberRef);
      console.log('Looking for user with email:', email);

      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(
          `Usuário com email "${memberRef}" não encontrado`,
        );
      }

      const userId = String(user._id);
      newMemberIds.push(userId);
      console.log('Added user by email:', user.name, 'ID:', userId);
    }

    const currentMemberIds = grupo.membros || [];
    console.log('Current members count:', currentMemberIds.length);
    console.log('New members to add:', newMemberIds.length);

    const allMemberIds = [...currentMemberIds, ...newMemberIds];
    const uniqueMemberIds = Array.from(new Set(allMemberIds));

    console.log('Total unique members after addition:', uniqueMemberIds.length);

    const updatedGroup = await this.gruposRepository.update(groupId, {
      membros: uniqueMemberIds,
    });

    console.log('Group updated successfully');
    return updatedGroup;
  }
}
