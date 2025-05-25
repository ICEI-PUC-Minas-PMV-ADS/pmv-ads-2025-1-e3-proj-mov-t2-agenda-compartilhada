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

  /* ────────────────────────────────────────────────────────────── */
  /** Helpers */
  /* ────────────────────────────────────────────────────────────── */
  private isObjectId(ref: string): boolean {
    return Types.ObjectId.isValid(ref);
  }

  /** Converte possíveis e-mails para minúsculo, conserva ObjectId */
  private normalizeRef(ref: string): string {
    return this.isObjectId(ref) ? ref : ref.trim().toLowerCase();
  }

  /* ────────────────────────────────────────────────────────────── */
  /** CREATE */
  /* ────────────────────────────────────────────────────────────── */
  async create(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    /* ----------------------------------------------------------------
       1. Copiamos as listas (evita mutação do DTO "readonly")
    ---------------------------------------------------------------- */
    const membrosRef = [...(createGrupoDto.membros ?? [])];
    const adminsRef = [...(createGrupoDto.grupoAdmins ?? [])];

    if (membrosRef.length === 0 && adminsRef.length === 0) {
      throw new BadRequestException(
        'membros e/ou grupoAdmins devem conter ao menos um ID ou e-mail',
      );
    }

    /* ----------------------------------------------------------------
       2. Gera tabela (ref original → ObjectId)
          – e-mails são comparados em letras minúsculas
    ---------------------------------------------------------------- */
    const refs = Array.from(new Set([...membrosRef, ...adminsRef]));
    const refToId = new Map<string, string>();

    for (const refOriginal of refs) {
      // Se já for ObjectId, salva direto
      if (this.isObjectId(refOriginal)) {
        refToId.set(refOriginal, refOriginal);
        continue;
      }

      // Normaliza e-mail para minúsculo antes da busca
      const email = this.normalizeRef(refOriginal);

      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`Usuário "${refOriginal}" não encontrado`);
      }

      refToId.set(refOriginal, String(user._id));
    }

    /* ----------------------------------------------------------------
       3. Monta arranjos finais de IDs (usando a tabela)
    ---------------------------------------------------------------- */
    const membrosIds = membrosRef.map((r) => refToId.get(r)!);
    const grupoAdminsIds = adminsRef.map((r) => refToId.get(r)!);

    /* ----------------------------------------------------------------
       4. Cria payload novo (mantém imutabilidade do DTO original)
    ---------------------------------------------------------------- */
    const payload: CreateGrupoDto = {
      ...createGrupoDto,
      membros: membrosIds,
      grupoAdmins: grupoAdminsIds,
    };

    return this.gruposRepository.create(payload);
  }

  /* ────────────────────────────────────────────────────────────── */
  /** READs */
  /* ────────────────────────────────────────────────────────────── */
  async findAll(): Promise<Grupo[]> {
    return this.gruposRepository.findAll();
  }

  async findOne(id: string): Promise<Grupo> {
    return this.gruposRepository.findOne(id);
  }

  /* ────────────────────────────────────────────────────────────── */
  /** UPDATE / DELETE */
  /* ────────────────────────────────────────────────────────────── */
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

    // usa o _id do usuário para consultar grupos cujo array membros contém esse id
    return this.gruposRepository.findByMemberId(String(user._id));
  }

  async getMembersWithDetails(
    groupId: string,
  ): Promise<Array<{ user: User; isAdmin: boolean }>> {
    // 1) busca o grupo
    const grupo = await this.gruposRepository.findOne(groupId);

    // 2) para cada membro, busca o usuário pelo ID e calcula a flag isAdmin
    const membersWithDetails = await Promise.all(
      grupo.membros.map(async (memberId) => {
        // usa o método findOne (existente no UsersService) para buscar por ID
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

  /* ────────────────────────────────────────────────────────────── */
  /** ADD MEMBERS */
  /* ────────────────────────────────────────────────────────────── */
  async addMembers(groupId: string, newMembers: string[]): Promise<Grupo> {
    // 1) Busca o grupo existente
    const grupo = await this.gruposRepository.findOne(groupId);

    // 2) Processa os novos membros (emails/IDs)
    const newMemberIds: string[] = [];

    for (const memberRef of newMembers) {
      // Se já for ObjectId válido, usa direto
      if (this.isObjectId(memberRef)) {
        // Verifica se o usuário existe
        const user = await this.usersService.findOne(memberRef);
        if (!user) {
          throw new NotFoundException(
            `Usuário com ID "${memberRef}" não encontrado`,
          );
        }
        newMemberIds.push(memberRef);
        continue;
      }

      // Caso contrário, trata como email (minúsculo)
      const email = this.normalizeRef(memberRef);
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(
          `Usuário com email "${memberRef}" não encontrado`,
        );
      }

      newMemberIds.push(String(user._id));
    }

    // 3) Remove duplicatas: combina membros existentes + novos
    const currentMemberIds = grupo.membros || [];
    const allMemberIds = [...currentMemberIds, ...newMemberIds];
    const uniqueMemberIds = Array.from(new Set(allMemberIds));

    // 4) Atualiza o grupo com a nova lista de membros
    return this.gruposRepository.update(groupId, {
      membros: uniqueMemberIds,
    });
  }
}
