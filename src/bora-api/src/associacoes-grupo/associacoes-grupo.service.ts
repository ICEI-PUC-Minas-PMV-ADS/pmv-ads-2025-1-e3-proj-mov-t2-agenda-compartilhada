import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AssociacaoGrupo,
  AssociacaoGrupoDocument,
} from './schema/associacoes-grupo.schema';
import { CreateAssociacaoGrupoDto } from './dto/create-associacoes-grupo.dto';
import { UpdateAssociacaoGrupoDto } from './dto/update-associacoes-grupo.dto';

@Injectable()
export class AssociacoesGrupoService {
  constructor(
    @InjectModel(AssociacaoGrupo.name)
    private readonly associacaoGrupoModel: Model<AssociacaoGrupoDocument>,
  ) {}

  async create(createDto: CreateAssociacaoGrupoDto): Promise<AssociacaoGrupo> {
    const created = new this.associacaoGrupoModel(createDto);
    return created.save();
  }

  async findAll(): Promise<AssociacaoGrupo[]> {
    return this.associacaoGrupoModel.find().exec();
  }

  async findOne(id: string): Promise<AssociacaoGrupo> {
    const doc = await this.associacaoGrupoModel.findById(id).exec();
    if (!doc) {
      throw new NotFoundException(`Associação com ID ${id} não encontrada`);
    }
    return doc;
  }

  async update(
    id: string,
    updateDto: UpdateAssociacaoGrupoDto,
  ): Promise<AssociacaoGrupo> {
    const updated = await this.associacaoGrupoModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Associação com ID ${id} não encontrada`);
    }
    return updated;
  }

  async remove(id: string): Promise<AssociacaoGrupo> {
    const deleted = await this.associacaoGrupoModel
      .findByIdAndDelete(id)
      .exec();
    if (!deleted) {
      throw new NotFoundException(`Associação com ID ${id} não encontrada`);
    }
    return deleted;
  }
}
