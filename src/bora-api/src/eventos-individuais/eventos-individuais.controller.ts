import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EventosIndividuaisService } from './eventos-individuais.service';
import { CreateEventoIndividualDto } from './dto/create-eventos-individuai.dto';
import { EventoIndividual } from './schema/eventos-individuais.schema';
import { UpdateEventoIndividualDto } from './dto/update-eventos-individuai.dto';

@Controller('eventos-individuais')
export class EventosIndividuaisController {
  constructor(private readonly service: EventosIndividuaisService) {}

  @Post()
  async create(
    @Body() dto: CreateEventoIndividualDto,
  ): Promise<EventoIndividual> {
    return this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<EventoIndividual[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventoIndividual> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventoIndividualDto,
  ): Promise<EventoIndividual> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<EventoIndividual> {
    return this.service.remove(id);
  }
}
