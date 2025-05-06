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
  Patch, // Importando o decorador para PATCH
} from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacoe.dto';
import { Notificacao } from './schema/notificacoes.schema';
import { UpdateNotificacaoDto } from './dto/update-notificacoe.dto';
import { JwtService } from '@nestjs/jwt'; // Adicione o JwtService
import { Types } from 'mongoose'; // Importando Types para validação de ObjectId

@Controller('notificacoes')
export class NotificacoesController {
  constructor(
    private readonly notificacoesService: NotificacoesService,
    private readonly jwtService: JwtService, // Injete o JwtService
  ) {}

  @Post()
  async create(
    @Body() createNotificacaoDto: CreateNotificacaoDto,
  ): Promise<Notificacao> {
    return this.notificacoesService.create(createNotificacaoDto); // Usando o serviço para criar
  }

  @Get()
  async findAll(): Promise<Notificacao[]> {
    return this.notificacoesService.findAll(); // Usando o serviço para buscar todas as notificações
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Notificacao> {
    return this.notificacoesService.findOne(id); // Usando o serviço para buscar por ID
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

  // Novo endpoint para buscar notificações de um usuário
  @Get('usuario/:usuarioId')
  async buscarPorUsuario(
    @Param('usuarioId') usuarioId: string,
    @Headers('Authorization') authHeader: string,
  ): Promise<Notificacao[]> {
    console.log('usuarioId recebido:', usuarioId);
    return this.notificacoesService.buscarPorUsuario(usuarioId);
  }

  // Endpoint para marcar a notificação como lida
  @Patch(':id/marcar-como-lida')
  async marcarComoLida(@Param('id') id: string): Promise<Notificacao> {
    return this.notificacoesService.marcarComoLida(id);
  }
}
