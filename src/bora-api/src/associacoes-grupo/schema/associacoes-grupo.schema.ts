import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssociacaoGrupoDocument = AssociacaoGrupo & Document;

@Schema({ timestamps: true })
export class AssociacaoGrupo {
  @Prop({ required: true })
  grupoId: string;

  @Prop({ required: true })
  associadoId: string;

  @Prop()
  papel?: string;
}

export const AssociacaoGrupoSchema =
  SchemaFactory.createForClass(AssociacaoGrupo);
