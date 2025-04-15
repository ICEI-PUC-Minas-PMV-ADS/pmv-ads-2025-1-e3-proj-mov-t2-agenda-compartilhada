import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento, EventoDocument } from '../schema/eventos.schema';
import { CreateEventoDto } from '../dto/create-evento.dto';
import { UpdateEventoDto } from '../dto/update-evento.dto';

@Injectable()
export class EventosRepository {
  constructor(
    @InjectModel(Evento.name)
    private readonly eventoModel: Model<EventoDocument>,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const createdEvento = new this.eventoModel(createEventoDto);
    return createdEvento.save();
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  async findOne(id: string): Promise<Evento> {
    const evento = await this.eventoModel.findById(id).exec();
    if (!evento) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }
    return evento;
  }

  async update(id: string, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    const updatedEvento = await this.eventoModel
      .findByIdAndUpdate(id, updateEventoDto, { new: true })
      .exec();
    if (!updatedEvento) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }
    return updatedEvento;
  }

  async remove(id: string): Promise<Evento> {
    const deletedEvento = await this.eventoModel.findByIdAndDelete(id).exec();
    if (!deletedEvento) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }
    return deletedEvento;
  }
}
