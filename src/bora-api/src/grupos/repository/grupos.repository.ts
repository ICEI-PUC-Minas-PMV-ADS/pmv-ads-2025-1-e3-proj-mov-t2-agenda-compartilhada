// src/grupos/repository/grupos.repository.ts
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
    console.log('Repository - create group with data:', createGrupoDto);
    try {
      const createdGrupo = new this.grupoModel(createGrupoDto);
      const result = await createdGrupo.save();
      console.log(
        'Repository - group created successfully with ID:',
        result._id,
      );
      return result;
    } catch (error) {
      console.error('Repository - error creating group:', error);
      throw error;
    }
  }

  async findAll(): Promise<Grupo[]> {
    try {
      const groups = await this.grupoModel.find().exec();
      console.log('Repository - found groups:', groups.length);
      return groups;
    } catch (error) {
      console.error('Repository - error finding all groups:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Grupo> {
    console.log('Repository - finding group by ID:', id);
    try {
      const grupo = await this.grupoModel.findById(id).exec();
      if (!grupo) {
        throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
      }
      console.log('Repository - group found:', grupo.nome);
      return grupo;
    } catch (error) {
      console.error('Repository - error finding group:', error);
      throw error;
    }
  }

  async findByUserEmail(email: string): Promise<Grupo[]> {
    console.log('Repository - finding groups by user email:', email);
    try {
      const groups = await this.grupoModel.find({ membros: email }).exec();
      console.log('Repository - found groups for email:', groups.length);
      return groups;
    } catch (error) {
      console.error('Repository - error finding groups by email:', error);
      throw error;
    }
  }

  async update(id: string, updateGrupoDto: UpdateGrupoDto): Promise<Grupo> {
    console.log(
      'Repository - updating group:',
      id,
      'with data:',
      updateGrupoDto,
    );
    try {
      const updatedGrupo = await this.grupoModel
        .findByIdAndUpdate(id, updateGrupoDto, { new: true })
        .exec();
      if (!updatedGrupo) {
        throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
      }
      console.log('Repository - group updated successfully:', id);
      return updatedGrupo;
    } catch (error) {
      console.error('Repository - error updating group:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<Grupo> {
    console.log('Repository - removing group:', id);
    try {
      const deletedGrupo = await this.grupoModel.findByIdAndDelete(id).exec();
      if (!deletedGrupo) {
        throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
      }
      console.log('Repository - group removed successfully:', id);
      return deletedGrupo;
    } catch (error) {
      console.error('Repository - error removing group:', error);
      throw error;
    }
  }

  async findByMemberId(userId: string): Promise<Grupo[]> {
    console.log('Repository - finding groups by member ID:', userId);
    try {
      const groups = await this.grupoModel.find({ membros: userId }).exec();
      console.log('Repository - found groups for member ID:', groups.length);
      return groups;
    } catch (error) {
      console.error('Repository - error finding groups by member ID:', error);
      throw error;
    }
  }

  async addMembers(groupId: string, memberIds: string[]): Promise<Grupo> {
    console.log(
      'Repository - adding members to group:',
      groupId,
      'members:',
      memberIds,
    );
    try {
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

      console.log('Repository - members added successfully to group:', groupId);
      console.log(
        'Repository - total members now:',
        updatedGrupo.membros.length,
      );
      return updatedGrupo;
    } catch (error) {
      console.error('Repository - error adding members:', error);
      throw error;
    }
  }

  async removeMember(groupId: string, memberId: string): Promise<Grupo> {
    console.log(
      'Repository - removing member from group:',
      groupId,
      'member:',
      memberId,
    );
    try {
      const updatedGrupo = await this.grupoModel
        .findByIdAndUpdate(
          groupId,
          {
            $pull: {
              membros: memberId,
              grupoAdmins: memberId,
            },
          },
          { new: true },
        )
        .exec();

      if (!updatedGrupo) {
        throw new NotFoundException(`Grupo com ID ${groupId} não encontrado`);
      }

      console.log(
        'Repository - member removed successfully from group:',
        groupId,
      );
      console.log(
        'Repository - total members now:',
        updatedGrupo.membros.length,
      );
      return updatedGrupo;
    } catch (error) {
      console.error('Repository - error removing member:', error);
      throw error;
    }
  }
}
