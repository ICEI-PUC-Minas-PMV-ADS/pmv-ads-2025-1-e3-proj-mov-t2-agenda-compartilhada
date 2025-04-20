import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notificacao, NotificacaoDocument } from './schema/notificacoes.schema';

@Injectable()
export class NotificacoesService {
  constructor(
    @InjectModel(Notificacao.name)
    private readonly notificacaoModel: Model<NotificacaoDocument>,
  ) {}

  // Criar uma nova notificação
  async criarNotificacao(data: {
    usuarioId: string;
    mensagem: string;
  }): Promise<Notificacao> {
    const nova = new this.notificacaoModel(data);
    return nova.save();
  }

  // Buscar notificações por usuário
  async buscarPorUsuario(usuarioId: string): Promise<Notificacao[]> {
    return this.notificacaoModel
      .find({ usuarioId })
      .sort({ createdAt: -1 }) // mais recentes primeiro
      .exec();
  }
}
