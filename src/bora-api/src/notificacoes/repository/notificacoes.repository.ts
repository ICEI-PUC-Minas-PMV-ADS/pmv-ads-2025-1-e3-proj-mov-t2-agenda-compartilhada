import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notificacao, NotificacaoDocument } from '../schema/notificacoes.schema';
import { CreateNotificacaoDto } from '../dto/create-notificacoe.dto';
import { UpdateNotificacaoDto } from '../dto/update-notificacoe.dto';
import { User, UserDocument } from '../../users/schema/user.schema';

@Injectable()
export class NotificacoesRepository {
  constructor(
    @InjectModel(Notificacao.name)
    private readonly notificacaoModel: Model<NotificacaoDocument>,
  
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    createNotificacaoDto: CreateNotificacaoDto,
  ): Promise<Notificacao> {
    const usuarioExiste = await this.userModel.exists({ _id: createNotificacaoDto.usuarioId });
    if (!usuarioExiste) {
      throw new NotFoundException(`Usuário com ID ${createNotificacaoDto.usuarioId} não encontrado.`);
    }

    const createdNotificacao = new this.notificacaoModel(createNotificacaoDto);
    return createdNotificacao.save();
  }

  async findByUserId(usuarioId: string): Promise<Notificacao[]> {
    let usuarioObjectId: Types.ObjectId | null = null;
  
    if (Types.ObjectId.isValid(usuarioId)) {
      usuarioObjectId = new Types.ObjectId(usuarioId);
    }
  
    if (!usuarioObjectId) {
      throw new NotFoundException(`ID de usuário inválido: ${usuarioId}`);
    }
  
    return this.notificacaoModel
      .find({ usuarioId: usuarioObjectId })
      .exec();
      
  }
  

  async findAll(): Promise<Notificacao[]> {
    return this.notificacaoModel.find().exec();
  }

  async findOne(id: string): Promise<Notificacao> {
    const notificacao = await this.notificacaoModel
      .findById(id)
      .populate('usuarioId', 'name email')
      .exec();
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
      .populate('usuarioId', 'name email')
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
