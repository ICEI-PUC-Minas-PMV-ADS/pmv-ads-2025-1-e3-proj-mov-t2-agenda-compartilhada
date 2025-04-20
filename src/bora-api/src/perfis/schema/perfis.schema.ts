import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Classe que representa o Perfil, e que já herda de Document do Mongoose
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

// O 'Perfil' já herda de 'Document' automaticamente. Não precisa exportar 'PerfilDocument'.
export const PerfilSchema = SchemaFactory.createForClass(Perfil);
