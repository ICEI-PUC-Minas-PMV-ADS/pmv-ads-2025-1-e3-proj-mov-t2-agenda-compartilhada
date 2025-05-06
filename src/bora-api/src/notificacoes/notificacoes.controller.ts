import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UnauthorizedException,
  Headers,
  Patch,
} from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacoe.dto';
import { Notificacao } from './schema/notificacoes.schema';
import { UpdateNotificacaoDto } from './dto/update-notificacoe.dto';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Controller('notificacoes')
export class NotificacoesController {
  constructor(
    private readonly notificacoesService: NotificacoesService,
    private readonly jwtService: JwtService,
  ) {}

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

  @Get('usuario/:usuarioId')
  async buscarPorUsuario(
    @Param('usuarioId') usuarioId: string,
    @Headers('Authorization') authHeader: string,
  ): Promise<Notificacao[]> {
    console.log('usuarioId recebido:', usuarioId);
    return this.notificacoesService.buscarPorUsuario(usuarioId);
  }

  @Patch(':id/marcar-como-lida')
  async marcarComoLida(@Param('id') id: string): Promise<Notificacao> {
    return this.notificacoesService.marcarComoLida(id);
  }
}
