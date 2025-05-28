import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventoDocument = Evento & Document;

@Schema({ timestamps: true })
export class Evento {

  _id: Types.ObjectId;

  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao?: string;

  @Prop({ required: true })
  dataEvento: Date;

  @Prop({ required: true, enum: ['individual', 'grupo'] })
  tipo: string;

  @Prop()
  grupoId?: string;
  
  @Prop()
  dataFimEvento?: Date; 

  @Prop({ required: true })
  duration: number;
  
  @Prop({ required: true })
  donoId?: string;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
