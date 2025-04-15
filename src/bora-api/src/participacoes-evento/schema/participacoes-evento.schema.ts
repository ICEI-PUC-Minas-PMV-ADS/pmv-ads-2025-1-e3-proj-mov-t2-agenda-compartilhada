import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParticipacaoEventoDocument = ParticipacaoEvento & Document;

@Schema({ timestamps: true })
export class ParticipacaoEvento {
  @Prop({ required: true })
  eventoId: string;

  @Prop({ required: true })
  usuarioId: string;

  @Prop()
  status?: string;
}

export const ParticipacaoEventoSchema = SchemaFactory.createForClass(ParticipacaoEvento);
