import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grupo, GrupoDocument } from '../schema/grupos.schema';
import { CreateGrupoDto } from '../dto/create-grupo.dto';
import { UpdateGrupoDto } from '../dto/update-grupo.dto';

@Injectable()
export class GruposRepository {
  constructor(
    @InjectModel(Grupo.name)
    private readonly grupoModel: Model<GrupoDocument>,
  ) {}

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

  async findByMemberId(userId: string): Promise<Grupo[]> {
    return this.grupoModel.find({ membros: userId }).exec();
  }

  async addMembers(groupId: string, memberIds: string[]): Promise<Grupo> {
    const updatedGrupo = await this.grupoModel
      .findByIdAndUpdate(
        groupId,
        { $addToSet: { membros: { $each: memberIds } } }, // $addToSet evita duplicatas
        { new: true },
      )
      .exec();

    if (!updatedGrupo) {
      throw new NotFoundException(`Grupo com ID ${groupId} não encontrado`);
    }

    return updatedGrupo;
  }

  async removeMember(groupId: string, userId: string): Promise<Grupo> {
    const updatedGrupo = await this.grupoModel
      .findByIdAndUpdate(
        groupId,
        {
          $pull: {
            membros: userId,
            grupoAdmins: userId // Remove também dos admins se for admin
          }
        },
        { new: true }
      )
      .exec();

    if (!updatedGrupo) {
      throw new NotFoundException(`Grupo com ID ${groupId} não encontrado`);
    }

    return updatedGrupo;
  }
}