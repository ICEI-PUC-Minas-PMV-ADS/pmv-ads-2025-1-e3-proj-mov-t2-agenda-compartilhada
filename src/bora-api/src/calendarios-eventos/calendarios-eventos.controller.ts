import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CalendariosEventosService } from './calendarios-eventos.service';
import { CreateCalendarioEventoDto } from './dto/create-calendarios-evento.dto';
import { CalendarioEvento } from './schema/calendario-eventos.schema';
import { UpdateCalendarioEventoDto } from './dto/update-calendarios-evento.dto';


@Controller('calendarios-eventos')
export class CalendariosEventosController {
  constructor(private readonly service: CalendariosEventosService) {}

  @Post()
  async create(
    @Body() dto: CreateCalendarioEventoDto,
  ): Promise<CalendarioEvento> {
    return this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<CalendarioEvento[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CalendarioEvento> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCalendarioEventoDto,
  ): Promise<CalendarioEvento> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CalendarioEvento> {
    return this.service.remove(id);
  }
}
