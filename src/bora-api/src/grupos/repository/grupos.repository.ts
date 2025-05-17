import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grupo, GrupoDocument } from '../schema/grupos.schema';
import { CreateGrupoDto } from '../dto/create-grupo.dto';
import { UpdateGrupoDto } from '../dto/update-grupo.dto';
import { Types } from 'mongoose';

@Injectable()
export class GruposRepository {
  constructor(
    @InjectModel(Grupo.name)
    private readonly grupoModel: Model<GrupoDocument>,  // Note GrupoDocument aqui
  ) {}

  // Aqui o retorno deve ser GrupoDocument para garantir o _id
  async create(createGrupoDto: CreateGrupoDto): Promise<GrupoDocument> {
    const createdGrupo = new this.grupoModel(createGrupoDto);
    return createdGrupo.save();
  }

  async findAll(): Promise<Grupo[]> {
    return this.grupoModel.find().exec();
  }

  async findOne(id: string): Promise<Grupo> {
    const grupo = await this.grupoModel.findById(id).exec();
    if (!grupo) {
      throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
    }
    return grupo;
  }

  async findByUserEmail(email: string): Promise<Grupo[]> {
    return this.grupoModel.find({ membros: email }).exec();
  }

  async update(id: string, updateGrupoDto: UpdateGrupoDto): Promise<Grupo> {
    const updatedGrupo = await this.grupoModel
      .findByIdAndUpdate(id, updateGrupoDto, { new: true })
      .exec();
    if (!updatedGrupo) {
      throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
    }
    return updatedGrupo;
  }

  async remove(id: string): Promise<Grupo> {
    const deletedGrupo = await this.grupoModel.findByIdAndDelete(id).exec();
    if (!deletedGrupo) {
      throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
    }
    return deletedGrupo;
  }
}
