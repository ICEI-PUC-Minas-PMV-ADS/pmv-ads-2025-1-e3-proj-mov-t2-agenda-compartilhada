import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

export const UserSchema = SchemaFactory.createForClass(User);
