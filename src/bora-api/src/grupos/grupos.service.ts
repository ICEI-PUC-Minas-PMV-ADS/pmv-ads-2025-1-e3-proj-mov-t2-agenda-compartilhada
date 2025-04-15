import { Injectable } from '@nestjs/common';
import { GruposRepository } from './repository/grupos.repository';
import { Grupo } from './schema/grupos.schema';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Injectable()
export class GruposService {
  constructor(private readonly gruposRepository: GruposRepository) {}

  async create(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
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
