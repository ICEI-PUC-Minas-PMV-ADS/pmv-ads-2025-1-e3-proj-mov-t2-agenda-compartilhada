import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EventosGruposService } from './eventos-grupo.service';
import { CreateEventoGrupoDto } from './dto/create-eventos-grupo.dto';
import { EventoGrupo } from './schema/eventos-grupo.schema';
import { UpdateEventoGrupoDto } from './dto/update-eventos-grupo.dto';

@Controller('eventos-grupos')
export class EventosGruposController {
  constructor(private readonly service: EventosGruposService) {}

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

  @Get('eventosGrupo/:grupoId')
  async findEventosByGrupoId(@Param('grupoId') grupoId: string) {
    return this.service.findEventosByGrupoId(grupoId);
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
}
