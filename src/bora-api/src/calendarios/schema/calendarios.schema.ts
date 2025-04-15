import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarioDocument = Calendario & Document;

@Schema({ timestamps: true })
export class Calendario {
  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true, enum: ['usuario', 'grupo'] })
  tipo: string;

  @Prop({ type: [String], default: [] })
  eventos: string[];
}

export const CalendarioSchema = SchemaFactory.createForClass(Calendario);
