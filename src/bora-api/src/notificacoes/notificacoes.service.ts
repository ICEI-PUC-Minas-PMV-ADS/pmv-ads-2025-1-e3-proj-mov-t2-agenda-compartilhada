import { Injectable } from '@nestjs/common';
import { NotificacoesRepository } from './repository/notificacoes.repository';
import { Notificacao } from './schema/natificacoes.schema';
import { CreateNotificacaoDto } from './dto/create-notificacoe.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacoe.dto';

@Injectable()
export class NotificacoesService {
  constructor(private readonly notificacoesRepository: NotificacoesRepository) {}

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
}
