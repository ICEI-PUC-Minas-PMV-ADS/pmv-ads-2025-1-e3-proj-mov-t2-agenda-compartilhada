import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';

export type NotificacaoDocument = Notificacao & Document;

@Schema({ timestamps: true })
export class Notificacao {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  usuarioId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  mensagem: string;

  @Prop({ default: () => new Date() })
  data: Date;

  @Prop({ default: false })
  lido: boolean;

  @Prop({ default: uuidv4, unique: true })
  notificationId: string;

  @Prop({ type: String, enum: ['comum', 'convite'], required: true, default: 'comum' })
  tipo: string;

  @Prop({ type: Object, default: {} })
  dadosExtras: Record<string, any>;
}

export const NotificacaoSchema = SchemaFactory.createForClass(Notificacao);
