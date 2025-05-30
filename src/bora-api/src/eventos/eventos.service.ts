import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventosRepository } from './repository/eventos.repository';
import { Evento, EventoDocument } from './schema/eventos.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { EventosGrupoService } from 'src/eventos-grupo/eventos-grupo.service';
import { EventosIndividuaisService } from 'src/eventos-individuais/eventos-individuais.service';


@Injectable()
export class EventosService {
  constructor(
    private readonly eventosRepository: EventosRepository,

    @Inject(forwardRef(() => EventosGrupoService))
    private readonly eventosGrupoService: EventosGrupoService,

    @Inject(forwardRef(() => EventosIndividuaisService))
    private readonly eventosIndividuaisService: EventosIndividuaisService,

  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const eventoCriado = await this.eventosRepository.create(createEventoDto);

    if (eventoCriado.donoId && eventoCriado.tipo === 'grupo') {
      await this.eventosGrupoService.create({
        eventoId: eventoCriado._id.toString(),
        grupoId: eventoCriado.donoId
      })
    }else if(eventoCriado.donoId && eventoCriado.tipo=='individual') {    
      await this.eventosIndividuaisService.create({
        eventoId: eventoCriado._id.toString(),
        usuarioId: eventoCriado.donoId
      })
    }
    return eventoCriado
  }

  async findAll(filter?: any): Promise<Evento[]> {
    return this.eventosRepository.findAll(filter);
  }

  async findOne(id: string): Promise<Evento> {
    return this.eventosRepository.findOne(id);
  }

  async update(id: string, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    return this.eventosRepository.update(id, updateEventoDto);
  }

  async remove(id: string): Promise<Evento> {
    
    // Remove o evento em evento-grupo quando o evento é deletado
    await this.eventosGrupoService.deleteMany({eventoId: id})


    // Remove o evento em evento-grupo quando o evento é deletado
    await this.eventosIndividuaisService.deleteMany({eventoId: id})

    return this.eventosRepository.remove(id);
  }
}
