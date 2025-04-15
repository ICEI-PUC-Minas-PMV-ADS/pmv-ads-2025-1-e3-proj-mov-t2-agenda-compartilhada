import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecoveryDocument = Recovery & Document;

@Schema({ timestamps: true })
export class Recovery {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export const RecoverySchema = SchemaFactory.createForClass(Recovery);
