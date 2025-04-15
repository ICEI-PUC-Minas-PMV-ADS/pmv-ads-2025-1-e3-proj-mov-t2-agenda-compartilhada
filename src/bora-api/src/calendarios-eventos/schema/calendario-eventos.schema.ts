import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarioEventoDocument = CalendarioEvento & Document;

@Schema({ timestamps: true })
export class CalendarioEvento {
  @Prop({ required: true })
  calendarioId: string;

  @Prop({ required: true })
  eventoId: string;
}

export const CalendarioEventoSchema = SchemaFactory.createForClass(CalendarioEvento);
