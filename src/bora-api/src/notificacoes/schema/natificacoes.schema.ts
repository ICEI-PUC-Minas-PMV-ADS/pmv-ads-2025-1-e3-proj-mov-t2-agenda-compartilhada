import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificacaoDocument = Notificacao & Document;

@Schema({ timestamps: true })
export class Notificacao {
  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true })
  mensagem: string;

  @Prop({ default: false })
  lida: boolean;
}

export const NotificacaoSchema = SchemaFactory.createForClass(Notificacao);
