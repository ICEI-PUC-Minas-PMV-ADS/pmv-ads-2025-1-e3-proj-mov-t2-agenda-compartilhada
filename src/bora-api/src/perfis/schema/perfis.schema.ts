import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PerfilDocument = Perfil & Document;

@Schema({ timestamps: true })
export class Perfil {
  @Prop({ required: true })
  userId: string;

  @Prop()
  bio?: string;

  @Prop()
  avatarUrl?: string;
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
