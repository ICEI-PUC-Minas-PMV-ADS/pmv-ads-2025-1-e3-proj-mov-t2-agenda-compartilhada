import { BadRequestException, Injectable } from '@nestjs/common';
import { GruposRepository } from './repository/grupos.repository';
import { Grupo } from './schema/grupos.schema';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { UsersService } from '../users/users.service'
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class GruposService {
  constructor(
    private readonly gruposRepository: GruposRepository,
    private readonly usersService: UsersService
  ) {}

  async create(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    
    // Valida usuários quando grupo é criado
    const { membros, grupoAdmins } = createGrupoDto;

    const userIds = Array.from(new Set ([...(membros ?? []), ...(grupoAdmins ?? [])]));

    if (userIds.length == 0) {
      throw new BadRequestException('membros e grupoAdmins devem conter ao menos um ID');
    }

    const userExiste = await Promise.all (
      userIds.map(async (id) => {
        try {
          await this.usersService.findOne(id);
          return true;
        } catch {
          return false;
        }
      })
    )

    const userValidos = userExiste.every((existe) => existe)

    if (!userValidos) {
      throw new NotFoundException(`Usuários inválidos ou inexistentes na criação do grupo`)
    }

    return this.gruposRepository.create(createGrupoDto);
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
}
