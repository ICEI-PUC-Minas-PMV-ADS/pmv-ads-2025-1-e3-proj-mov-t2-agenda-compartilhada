import { Injectable } from '@nestjs/common';
import { EventosRepository } from './repository/eventos.repository';
import { Evento, EventoDocument } from './schema/eventos.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { EventosGruposService } from 'src/eventos-grupo/eventos-grupo.service';

@Injectable()
export class EventosService {
  constructor(
    private readonly eventosRepository: EventosRepository,
    private readonly eventosGrupoService: EventosGruposService
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const eventoCriado = await this.eventosRepository.create(createEventoDto);

    if (eventoCriado.grupoId && eventoCriado.tipo === 'grupo') {
      await this.eventosGrupoService.create({
        eventoId: eventoCriado._id.toString(),
        grupoId: eventoCriado.grupoId
      })
    }
    return eventoCriado
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
