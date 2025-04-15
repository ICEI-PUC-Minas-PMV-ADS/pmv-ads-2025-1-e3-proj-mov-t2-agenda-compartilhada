import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventoGrupo,
  EventoGrupoDocument,
} from './schema/eventos-grupo.schema';
import { CreateEventoGrupoDto } from './dto/create-eventos-grupo.dto';
import { UpdateEventoGrupoDto } from './dto/update-eventos-grupo.dto';

@Injectable()
export class EventosGruposService {
  constructor(
    @InjectModel(EventoGrupo.name)
    private readonly model: Model<EventoGrupoDocument>,
  ) {}

  async create(dto: CreateEventoGrupoDto): Promise<EventoGrupo> {
    const created = new this.model(dto);
    return created.save();
  }

  async findAll(): Promise<EventoGrupo[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<EventoGrupo> {
    const item = await this.model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`EventoGrupo com ID ${id} não encontrado`);
    }
    return item;
  }

  async update(id: string, dto: UpdateEventoGrupoDto): Promise<EventoGrupo> {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`EventoGrupo com ID ${id} não encontrado`);
    }
    return updated;
  }

  async remove(id: string): Promise<EventoGrupo> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`EventoGrupo com ID ${id} não encontrado`);
    }
    return deleted;
  }
}
