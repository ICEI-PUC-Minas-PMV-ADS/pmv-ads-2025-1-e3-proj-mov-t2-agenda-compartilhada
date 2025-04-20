import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Explicitamente declarando que o _id é do tipo Types.ObjectId
export type UserDocument = User & Document & { _id: Types.ObjectId };

@Schema({ collection: 'usuarios' })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

// Criando o Schema do Mongoose
export const UserSchema = SchemaFactory.createForClass(User);
