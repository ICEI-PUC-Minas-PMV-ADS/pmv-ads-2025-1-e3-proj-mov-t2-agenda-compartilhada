import { Injectable } from '@nestjs/common';
import { CalendariosRepository } from './repository/calendarios.repository';
import { Calendario } from './schema/calendarios.schema';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';

@Injectable()
export class CalendariosService {
  constructor(private readonly calendariosRepository: CalendariosRepository) {}

  async create(createCalendarioDto: CreateCalendarioDto): Promise<Calendario> {
    return this.calendariosRepository.create(createCalendarioDto);
  }

  async findAll(): Promise<Calendario[]> {
    return this.calendariosRepository.findAll();
  }

  async findOne(id: string): Promise<Calendario> {
    return this.calendariosRepository.findOne(id);
  }

  async update(id: string, updateCalendarioDto: UpdateCalendarioDto): Promise<Calendario> {
    return this.calendariosRepository.update(id, updateCalendarioDto);
  }

  async remove(id: string): Promise<Calendario> {
    return this.calendariosRepository.remove(id);
  }
}
