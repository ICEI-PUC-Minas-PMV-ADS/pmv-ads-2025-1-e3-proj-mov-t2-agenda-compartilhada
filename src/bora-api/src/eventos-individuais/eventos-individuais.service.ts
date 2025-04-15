import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventoIndividual,
  EventoIndividualDocument,
} from './schema/eventos-individuais.schema';
import { CreateEventoIndividualDto } from './dto/create-eventos-individuai.dto';
import { UpdateEventoIndividualDto } from './dto/update-eventos-individuai.dto';

@Injectable()
export class EventosIndividuaisService {
  constructor(
    @InjectModel(EventoIndividual.name)
    private readonly model: Model<EventoIndividualDocument>,
  ) {}

  async create(dto: CreateEventoIndividualDto): Promise<EventoIndividual> {
    const created = new this.model(dto);
    return created.save();
  }

  async findAll(): Promise<EventoIndividual[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<EventoIndividual> {
    const item = await this.model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(
        `EventoIndividual com ID ${id} não encontrado`,
      );
    }
    return item;
  }

  async update(
    id: string,
    dto: UpdateEventoIndividualDto,
  ): Promise<EventoIndividual> {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(
        `EventoIndividual com ID ${id} não encontrado`,
      );
    }
    return updated;
  }

  async remove(id: string): Promise<EventoIndividual> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(
        `EventoIndividual com ID ${id} não encontrado`,
      );
    }
    return deleted;
  }
}
