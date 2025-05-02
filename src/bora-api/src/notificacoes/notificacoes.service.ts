import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NotificacoesRepository } from './repository/notificacoes.repository';
import { Notificacao } from './schema/notificacoes.schema';
import { CreateNotificacaoDto } from './dto/create-notificacoe.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacoe.dto';
import { Types } from 'mongoose';

@Injectable()
export class NotificacoesService {
  constructor(
    private readonly notificacoesRepository: NotificacoesRepository,
  ) {}

  async create(createNotificacaoDto: CreateNotificacaoDto): Promise<Notificacao> {
    return this.notificacoesRepository.create(createNotificacaoDto);
  }

  async findAll(): Promise<Notificacao[]> {
    return this.notificacoesRepository.findAll();
  }

  async findOne(id: string): Promise<Notificacao> {
    return this.notificacoesRepository.findOne(id);
  }

  async update(id: string, updateNotificacaoDto: UpdateNotificacaoDto): Promise<Notificacao> {
    return this.notificacoesRepository.update(id, updateNotificacaoDto);
  }

  async remove(id: string): Promise<Notificacao> {
    return this.notificacoesRepository.remove(id);
  }

  async buscarPorUsuario(usuarioId: string): Promise<Notificacao[]> {
    if (!Types.ObjectId.isValid(usuarioId)) {
      throw new UnauthorizedException('ID de usuário inválido');
    }

    return this.notificacoesRepository.findByUserId(usuarioId);
  }

  async marcarComoLida(id: string): Promise<Notificacao> {
    if (!Types.ObjectId.isValid(id)) {
      throw new UnauthorizedException('ID de notificação inválido');
    }

    return this.notificacoesRepository.update(id, { lido: true });
  }
}
