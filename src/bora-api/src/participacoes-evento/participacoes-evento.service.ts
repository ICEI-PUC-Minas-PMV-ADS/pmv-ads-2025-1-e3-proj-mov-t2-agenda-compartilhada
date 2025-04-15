import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ParticipacaoEvento,
  ParticipacaoEventoDocument,
} from './schema/participacoes-evento.schema';
import { CreateParticipacaoEventoDto } from './dto/create-participacoes-evento.dto';
import { UpdateParticipacaoEventoDto } from './dto/update-participacoes-evento.dto';

@Injectable()
export class ParticipacoesEventoService {
  constructor(
    @InjectModel(ParticipacaoEvento.name)
    private readonly model: Model<ParticipacaoEventoDocument>,
  ) {}

  async create(dto: CreateParticipacaoEventoDto): Promise<ParticipacaoEvento> {
    const created = new this.model(dto);
    return created.save();
  }

  async findAll(): Promise<ParticipacaoEvento[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<ParticipacaoEvento> {
    const item = await this.model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(
        `ParticipacaoEvento com ID ${id} não encontrada`,
      );
    }
    return item;
  }

  async update(
    id: string,
    dto: UpdateParticipacaoEventoDto,
  ): Promise<ParticipacaoEvento> {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(
        `ParticipacaoEvento com ID ${id} não encontrada`,
      );
    }
    return updated;
  }

  async remove(id: string): Promise<ParticipacaoEvento> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(
        `ParticipacaoEvento com ID ${id} não encontrada`,
      );
    }
    return deleted;
  }
}
