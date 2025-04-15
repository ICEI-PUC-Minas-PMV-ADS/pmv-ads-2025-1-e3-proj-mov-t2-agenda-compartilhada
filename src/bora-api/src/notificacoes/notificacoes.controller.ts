import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacoe.dto';
import { Notificacao } from './schema/natificacoes.schema';
import { UpdateNotificacaoDto } from './dto/update-notificacoe.dto';

@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  @Post()
  async create(
    @Body() createNotificacaoDto: CreateNotificacaoDto,
  ): Promise<Notificacao> {
    return this.notificacoesService.create(createNotificacaoDto);
  }

  @Get()
  async findAll(): Promise<Notificacao[]> {
    return this.notificacoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Notificacao> {
    return this.notificacoesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificacaoDto: UpdateNotificacaoDto,
  ): Promise<Notificacao> {
    return this.notificacoesService.update(id, updateNotificacaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Notificacao> {
    return this.notificacoesService.remove(id);
  }
}
