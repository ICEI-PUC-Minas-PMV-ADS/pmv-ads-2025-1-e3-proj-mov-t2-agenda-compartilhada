import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './schema/eventos.schema';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  async create(@Body() createEventoDto: CreateEventoDto): Promise<Evento> {
    return this.eventosService.create(createEventoDto);
  }

  @Get()
  async findAll(): Promise<Evento[]> {
    return this.eventosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Evento> {
    return this.eventosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventoDto: UpdateEventoDto,
  ): Promise<Evento> {
    return this.eventosService.update(id, updateEventoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Evento> {
    return this.eventosService.remove(id);
  }
}
