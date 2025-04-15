import { Document } from 'mongoose';

export interface Calendario extends Document {
  ownerId: string;
  tipo: 'usuario' | 'grupo';
  eventos: string[];
}
