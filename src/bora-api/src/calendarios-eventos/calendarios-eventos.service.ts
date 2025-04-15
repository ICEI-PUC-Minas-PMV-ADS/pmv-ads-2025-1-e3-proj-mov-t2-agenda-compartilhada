import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CalendarioEvento,
  CalendarioEventoDocument,
} from './schema/calendario-eventos.schema';
import { CreateCalendarioEventoDto } from './dto/create-calendarios-evento.dto';
import { UpdateCalendarioEventoDto } from './dto/update-calendarios-evento.dto';

@Injectable()
export class CalendariosEventosService {
  constructor(
    @InjectModel(CalendarioEvento.name)
    private readonly model: Model<CalendarioEventoDocument>,
  ) {}

  async create(dto: CreateCalendarioEventoDto): Promise<CalendarioEvento> {
    const created = new this.model(dto);
    return created.save();
  }

  async findAll(): Promise<CalendarioEvento[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<CalendarioEvento> {
    const item = await this.model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(
        `CalendarioEvento com ID ${id} não encontrado`,
      );
    }
    return item;
  }

  async update(
    id: string,
    dto: UpdateCalendarioEventoDto,
  ): Promise<CalendarioEvento> {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(
        `CalendarioEvento com ID ${id} não encontrado`,
      );
    }
    return updated;
  }

  async remove(id: string): Promise<CalendarioEvento> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(
        `CalendarioEvento com ID ${id} não encontrado`,
      );
    }
    return deleted;
  }
}
