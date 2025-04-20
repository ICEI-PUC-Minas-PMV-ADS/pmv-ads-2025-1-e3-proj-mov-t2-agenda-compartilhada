import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Importa o gerador de UUID
import * as mongoose from 'mongoose';  // Importando o mongoose para o tipo ObjectId

export type NotificacaoDocument = Notificacao & Document;

@Schema({ timestamps: true })
export class Notificacao {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })  // Alteração para referência de User
  usuarioId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  mensagem: string;

  @Prop({ default: () => new Date() }) // Data gerada automaticamente
  data: Date;

  @Prop({ default: false })
  lido: boolean;

  // Gera um UUID único automaticamente
  @Prop({ default: uuidv4, unique: true })
  notificationId: string;
}

export const NotificacaoSchema = SchemaFactory.createForClass(Notificacao);
