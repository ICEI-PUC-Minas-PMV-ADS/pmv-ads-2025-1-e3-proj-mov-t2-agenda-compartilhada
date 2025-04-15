import { Document } from 'mongoose';

export interface Perfil extends Document {
  userId: string;
  bio?: string;
  avatarUrl?: string;
}
