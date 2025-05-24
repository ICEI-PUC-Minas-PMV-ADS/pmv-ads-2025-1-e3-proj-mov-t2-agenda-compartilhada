import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EventosGrupoService } from './eventos-grupo.service';
import { CreateEventoGrupoDto } from './dto/create-eventos-grupo.dto';
import { EventoGrupo } from './schema/eventos-grupo.schema';
import { UpdateEventoGrupoDto } from './dto/update-eventos-grupo.dto';
import { Evento } from 'src/eventos/schema/eventos.schema';

@Controller('eventos-grupo')
export class EventosGrupoController {
  constructor(private readonly service: EventosGrupoService) {}

  @Post()
  async create(@Body() dto: CreateEventoGrupoDto): Promise<EventoGrupo> {
    return this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<EventoGrupo[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventoGrupo> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventoGrupoDto,
  ): Promise<EventoGrupo> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<EventoGrupo> {
    return this.service.remove(id);
  }

  @Get('by-grupoId/:grupoId')
  async findEventosByGrupoId(@Param('grupoId') grupoId: string): Promise<Evento[]> {
    return this.service.findEventosByGrupoId(grupoId);
  }
}
