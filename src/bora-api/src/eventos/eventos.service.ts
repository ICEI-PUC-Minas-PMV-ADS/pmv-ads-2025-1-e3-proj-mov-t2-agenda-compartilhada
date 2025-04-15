import { Injectable } from '@nestjs/common';
import { EventosRepository } from './repository/eventos.repository';
import { Evento } from './schema/eventos.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventosService {
  constructor(private readonly eventosRepository: EventosRepository) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    return this.eventosRepository.create(createEventoDto);
  }

  async findAll(): Promise<Evento[]> {
    return this.eventosRepository.findAll();
  }

  async findOne(id: string): Promise<Evento> {
    return this.eventosRepository.findOne(id);
  }

  async update(id: string, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    return this.eventosRepository.update(id, updateEventoDto);
  }

  async remove(id: string): Promise<Evento> {
    return this.eventosRepository.remove(id);
  }
}
