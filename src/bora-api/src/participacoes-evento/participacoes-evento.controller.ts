import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ParticipacoesEventoService } from './participacoes-evento.service';
import { CreateParticipacaoEventoDto } from './dto/create-participacoes-evento.dto';
import { ParticipacaoEvento } from './schema/participacoes-evento.schema';
import { UpdateParticipacaoEventoDto } from './dto/update-participacoes-evento.dto';

@Controller('participacoes-evento')
export class ParticipacoesEventoController {
  constructor(private readonly service: ParticipacoesEventoService) {}

  @Post()
  async create(
    @Body() dto: CreateParticipacaoEventoDto,
  ): Promise<ParticipacaoEvento> {
    return this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<ParticipacaoEvento[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ParticipacaoEvento> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateParticipacaoEventoDto,
  ): Promise<ParticipacaoEvento> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ParticipacaoEvento> {
    return this.service.remove(id);
  }
}
