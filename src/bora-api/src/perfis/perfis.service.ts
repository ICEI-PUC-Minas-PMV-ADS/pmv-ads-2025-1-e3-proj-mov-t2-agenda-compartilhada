import { Injectable } from '@nestjs/common';
import { PerfisRepository } from './repository/perfis.repository';
import { Perfil } from './schema/perfis.schema';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Injectable()
export class PerfisService {
  constructor(private readonly perfisRepository: PerfisRepository) {}

  async create(createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    return this.perfisRepository.create(createPerfilDto);
  }

  async findAll(): Promise<Perfil[]> {
    return this.perfisRepository.findAll();
  }

  async findOne(id: string): Promise<Perfil> {
    return this.perfisRepository.findOne(id);
  }

  async update(id: string, updatePerfilDto: UpdatePerfilDto): Promise<Perfil> {
    return this.perfisRepository.update(id, updatePerfilDto);
  }

  async remove(id: string): Promise<Perfil> {
    return this.perfisRepository.remove(id);
  }
}
