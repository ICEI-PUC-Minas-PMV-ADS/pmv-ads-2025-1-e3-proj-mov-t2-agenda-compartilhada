import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfil, PerfilDocument } from '../schema/perfis.schema';
import { CreatePerfilDto } from '../dto/create-perfil.dto';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';

@Injectable()
export class PerfisRepository {
  constructor(
    @InjectModel(Perfil.name)
    private readonly perfilModel: Model<PerfilDocument>,
  ) {}

  async create(createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    const createdPerfil = new this.perfilModel(createPerfilDto);
    return createdPerfil.save();
  }

  async findAll(): Promise<Perfil[]> {
    return this.perfilModel.find().exec();
  }

  async findOne(id: string): Promise<Perfil> {
    const perfil = await this.perfilModel.findById(id).exec();
    if (!perfil) {
      throw new NotFoundException(`Perfil com ID ${id} não encontrado`);
    }
    return perfil;
  }

  async update(id: string, updatePerfilDto: UpdatePerfilDto): Promise<Perfil> {
    const updatedPerfil = await this.perfilModel
      .findByIdAndUpdate(id, updatePerfilDto, { new: true })
      .exec();
    if (!updatedPerfil) {
      throw new NotFoundException(`Perfil com ID ${id} não encontrado`);
    }
    return updatedPerfil;
  }

  async remove(id: string): Promise<Perfil> {
    const deletedPerfil = await this.perfilModel.findByIdAndDelete(id).exec();
    if (!deletedPerfil) {
      throw new NotFoundException(`Perfil com ID ${id} não encontrado`);
    }
    return deletedPerfil;
  }
}
