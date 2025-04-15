import { Document } from 'mongoose';

export interface CalendarioEvento extends Document {
  calendarioId: string;
  eventoId: string;
}
