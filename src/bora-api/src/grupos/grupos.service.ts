import { Injectable } from '@nestjs/common';
import { GruposRepository } from './repository/grupos.repository';
import { Grupo, GrupoDocument } from './schema/grupos.schema';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PerfisService } from '../perfis/perfis.service';
import { CreatePerfilDto } from '../perfis/dto/create-perfil.dto';
import { Types } from 'mongoose';

@Injectable()
export class GruposService {
  constructor(
    private readonly gruposRepository: GruposRepository,
    private readonly perfisService: PerfisService,
  ) {}

  async create(createGrupoDto: CreateGrupoDto, userId: string, pathFoto: string): Promise<GrupoDocument> {
  const novoGrupo = await this.gruposRepository.create(createGrupoDto);

  const perfilDto: CreatePerfilDto = {
    _id: novoGrupo._id as Types.ObjectId, // Types.ObjectId já aqui
    nome: novoGrupo.nome,
    foto: pathFoto,
    tipoDono: 'grupo',
    userId: new Types.ObjectId(userId),
  };

  await this.perfisService.create(perfilDto);

  return novoGrupo;
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
