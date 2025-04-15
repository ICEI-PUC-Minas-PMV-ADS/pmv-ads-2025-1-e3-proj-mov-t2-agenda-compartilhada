import { Document } from 'mongoose';

export interface Recovery extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
}
