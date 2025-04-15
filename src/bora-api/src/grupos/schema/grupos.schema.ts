import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GrupoDocument = Grupo & Document;

@Schema({ timestamps: true })
export class Grupo {
  @Prop({ required: true })
  nome: string;

  @Prop()
  descricao?: string;

  @Prop({ type: [String], default: [] })
  membros: string[];
}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
