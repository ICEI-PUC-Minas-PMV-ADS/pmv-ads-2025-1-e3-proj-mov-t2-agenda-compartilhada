import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './schema/eventos.schema';
import { GruposService } from 'src/grupos/grupos.service';

@Controller('eventos')
export class EventosController {
  constructor(
    private readonly eventosService: EventosService,
    private readonly gruposService: GruposService,
  ) {}

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

  @Get('donoId/:id')
  async findByDonoId(@Param('id') donoId: string): Promise<Evento[]> {
    return this.eventosService.findAll({ donoId });
  }

  @Get('individuais/usuario/:id')
  async findEventosIndividuaisPorUsuario(@Param('id') id: string): Promise<Evento[]> {
    return this.eventosService.findAll({ donoId: id, tipo: 'individual' });
  }

  @Get('grupo/usuario/:email')
  async findEventosDeGruposPorUsuario(@Param('email') email: string): Promise<Evento[]> {
    const grupos = await this.gruposService.findByUserEmail(email);
    const grupoIds = grupos.map(grupo => grupo._id.toString());
    return this.eventosService.findAll({ donoId: { $in: grupoIds }, tipo: 'grupo' });
  }

  @Get('individuais/email/:email')
  async findEventosIndividuaisPorEmail(@Param('email') email: string): Promise<Evento[]> {
    return this.eventosService.findIndividuaisByEmail(email);
  }

  @Get('todos-eventos/:id')
  async getTodosEventosDoGrupo(@Param('id') grupoId: string) {
    return this.eventosService.getEventosCompletosDoGrupo(grupoId);
  }
}
