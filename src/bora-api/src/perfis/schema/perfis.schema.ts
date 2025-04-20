import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'perfils' })
export class Perfil extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  nome: string;

  @Prop({ type: String, required: false, default: null })
  foto: string | null;

  @Prop({ type: String, enum: ['usuario', 'grupo'], default: 'usuario' })
  tipoDono: 'usuario' | 'grupo';
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
