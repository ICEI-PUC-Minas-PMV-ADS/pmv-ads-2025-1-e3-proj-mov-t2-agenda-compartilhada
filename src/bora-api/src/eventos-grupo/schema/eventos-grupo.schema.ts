import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventoGrupoDocument = EventoGrupo & Document;

@Schema({ timestamps: true })
export class EventoGrupo {
  @Prop({ required: true })
  eventoId: string;

  @Prop({ required: true })
  grupoId: string;
}

export const EventoGrupoSchema = SchemaFactory.createForClass(EventoGrupo);
