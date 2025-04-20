import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NotificacoesRepository } from './repository/notificacoes.repository'; // Importando o repositório
import { Notificacao } from './schema/notificacoes.schema';
import { CreateNotificacaoDto } from './dto/create-notificacoe.dto';  // Importe o DTO de criação
import { UpdateNotificacaoDto } from './dto/update-notificacoe.dto';  // Importe o DTO de atualização
import { Types } from 'mongoose'; // Importando Types para validação de ObjectId

@Injectable()
export class NotificacoesService {
  constructor(
    private readonly notificacoesRepository: NotificacoesRepository, // Injetando o repositório
  ) {}

  // Criar uma nova notificação
  async create(createNotificacaoDto: CreateNotificacaoDto): Promise<Notificacao> {
    return this.notificacoesRepository.create(createNotificacaoDto); // Usando o repositório para criar
  }

  // Buscar todas as notificações
  async findAll(): Promise<Notificacao[]> {
    return this.notificacoesRepository.findAll(); // Usando o repositório para buscar todas as notificações
  }

  // Buscar uma notificação por ID
  async findOne(id: string): Promise<Notificacao> {
    return this.notificacoesRepository.findOne(id); // Usando o repositório para buscar por ID
  }

  // Atualizar uma notificação
  async update(id: string, updateNotificacaoDto: UpdateNotificacaoDto): Promise<Notificacao> {
    return this.notificacoesRepository.update(id, updateNotificacaoDto); // Usando o repositório para atualizar a notificação
  }

  // Remover uma notificação
  async remove(id: string): Promise<Notificacao> {
    return this.notificacoesRepository.remove(id); // Usando o repositório para remover a notificação
  }

  // Buscar notificações por usuário
  async buscarPorUsuario(usuarioId: string): Promise<Notificacao[]> {
    // Verifica se o usuarioId é um ObjectId válido
    if (!Types.ObjectId.isValid(usuarioId)) {
      throw new UnauthorizedException('ID de usuário inválido');
    }

    // Chama o repositório para buscar as notificações pelo usuário
    return this.notificacoesRepository.findByUserId(usuarioId); // Usando o repositório para buscar notificações de um usuário
  }

  // Novo método para marcar a notificação como lida
  async marcarComoLida(id: string): Promise<Notificacao> {
    // Verifica se o ID é válido
    if (!Types.ObjectId.isValid(id)) {
      throw new UnauthorizedException('ID de notificação inválido');
    }

    // Chama o repositório para atualizar o campo 'lido' para true
    return this.notificacoesRepository.update(id, { lido: true });
  }
}
