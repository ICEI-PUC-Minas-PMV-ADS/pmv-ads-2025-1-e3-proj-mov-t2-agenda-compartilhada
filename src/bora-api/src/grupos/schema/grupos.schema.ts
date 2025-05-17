import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Evento, EventoSchema } from '../../eventos/schema/eventos.schema'; // ajuste o caminho se necessário

export type GrupoDocument = Grupo & Document;

@Schema({ timestamps: true })
export class Grupo {
  @Prop({ required: true })
  nome: string;

  @Prop()
  descricao?: string;

  @Prop({ type: [String], default: [] })
  membros: string[];

  @Prop({ type: [EventoSchema], default: [] })
  eventos: Evento[];
}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
