import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventoIndividualDocument = EventoIndividual & Document;

@Schema({ timestamps: true })
export class EventoIndividual {
  @Prop({ required: true })
  eventoId: string;

  @Prop({ required: true })
  usuarioId: string;
}

export const EventoIndividualSchema = SchemaFactory.createForClass(EventoIndividual);
