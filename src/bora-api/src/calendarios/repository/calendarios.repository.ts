import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calendario, CalendarioDocument } from '../schema/calendarios.schema';
import { CreateCalendarioDto } from '../dto/create-calendario.dto';
import { UpdateCalendarioDto } from '../dto/update-calendario.dto';

@Injectable()
export class CalendariosRepository {
  constructor(
    @InjectModel(Calendario.name)
    private readonly calendarioModel: Model<CalendarioDocument>,
  ) {}

  async create(createCalendarioDto: CreateCalendarioDto): Promise<Calendario> {
    const createdCalendario = new this.calendarioModel(createCalendarioDto);
    return createdCalendario.save();
  }

  async findAll(): Promise<Calendario[]> {
    return this.calendarioModel.find().exec();
  }

  async findOne(id: string): Promise<Calendario> {
    const calendario = await this.calendarioModel.findById(id).exec();
    if (!calendario) {
      throw new NotFoundException(`Calendário com ID ${id} não encontrado`);
    }
    return calendario;
  }

  async update(id: string, updateCalendarioDto: UpdateCalendarioDto): Promise<Calendario> {
    const updatedCalendario = await this.calendarioModel
      .findByIdAndUpdate(id, updateCalendarioDto, { new: true })
      .exec();
    if (!updatedCalendario) {
      throw new NotFoundException(`Calendário com ID ${id} não encontrado`);
    }
    return updatedCalendario;
  }

  async remove(id: string): Promise<Calendario> {
    const deletedCalendario = await this.calendarioModel.findByIdAndDelete(id).exec();
    if (!deletedCalendario) {
      throw new NotFoundException(`Calendário com ID ${id} não encontrado`);
    }
    return deletedCalendario;
  }
}
