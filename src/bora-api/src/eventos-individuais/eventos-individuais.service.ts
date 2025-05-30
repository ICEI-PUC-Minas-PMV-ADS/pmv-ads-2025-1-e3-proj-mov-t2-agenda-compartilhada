import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventoIndividual,
  EventoIndividualDocument,
} from './schema/eventos-individuais.schema';
import { CreateEventoIndividualDto } from './dto/create-eventos-individuai.dto';
import { UpdateEventoIndividualDto } from './dto/update-eventos-individuai.dto';
import { EventosService } from 'src/eventos/eventos.service';
import { Evento } from 'src/eventos/schema/eventos.schema';

@Injectable()
export class EventosIndividuaisService {
  constructor(
    @InjectModel(EventoIndividual.name)
    private readonly model: Model<EventoIndividualDocument>,

    @Inject(forwardRef(() => EventosService))
    private readonly eventosService: EventosService
  ) { }

  async create(dto: CreateEventoIndividualDto): Promise<EventoIndividual> {
    const created = new this.model(dto);
    return created.save();
  }

  async findAll(): Promise<Evento[]> {
    const eventosIndividuais = await this.model.find().exec()
    const eventoIds = eventosIndividuais.map((eventoIndividual) => eventoIndividual.eventoId)
    const eventos = await this.eventosService.findAll({
      _id: { $in: eventoIds },
      tipo: 'individual'
    })
    eventos.sort(
      (a, b) => new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime()
    );
    return eventos;
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

  async deleteMany(conditions: any) {
    return this.model.deleteMany(conditions).exec()
  }

  async findEventosIndividuaisByUserId(usuarioId: string): Promise<Evento[]> {
    const eventosIndividuais = await this.model.find({ usuarioId }).exec()

    const eventoIds = eventosIndividuais.map((evento) => evento.eventoId)

    const eventos = await this.eventosService.findAll({
      _id: { $in: eventoIds }
    })
    eventos.sort((a, b) => new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime());

    return eventos
  }
}
