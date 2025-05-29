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

  @Prop()
  dataFimEvento?: Date;

  @Prop({ required: true, enum: ['individual', 'grupo'] })
  tipo: string;

  @Prop({required: true})
  donoId: string; //GrupoId ou UserId

  @Prop()
  confirmados: string[];

  @Prop()
  recusas: string[];
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
