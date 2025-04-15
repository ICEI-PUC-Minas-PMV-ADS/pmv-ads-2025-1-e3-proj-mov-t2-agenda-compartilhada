import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notificacao,
  NotificacaoDocument,
} from '../schema/natificacoes.schema';
import { CreateNotificacaoDto } from '../dto/create-notificacoe.dto';
import { UpdateNotificacaoDto } from '../dto/update-notificacoe.dto';

@Injectable()
export class NotificacoesRepository {
  constructor(
    @InjectModel(Notificacao.name)
    private readonly notificacaoModel: Model<NotificacaoDocument>,
  ) {}

  async create(
    createNotificacaoDto: CreateNotificacaoDto,
  ): Promise<Notificacao> {
    const createdNotificacao = new this.notificacaoModel(createNotificacaoDto);
    return createdNotificacao.save();
  }

  async findAll(): Promise<Notificacao[]> {
    return this.notificacaoModel.find().exec();
  }

  async findOne(id: string): Promise<Notificacao> {
    const notificacao = await this.notificacaoModel.findById(id).exec();
    if (!notificacao) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada`);
    }
    return notificacao;
  }

  async update(
    id: string,
    updateNotificacaoDto: UpdateNotificacaoDto,
  ): Promise<Notificacao> {
    const updatedNotificacao = await this.notificacaoModel
      .findByIdAndUpdate(id, updateNotificacaoDto, { new: true })
      .exec();
    if (!updatedNotificacao) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada`);
    }
    return updatedNotificacao;
  }

  async remove(id: string): Promise<Notificacao> {
    const deletedNotificacao = await this.notificacaoModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedNotificacao) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada`);
    }
    return deletedNotificacao;
  }
}
