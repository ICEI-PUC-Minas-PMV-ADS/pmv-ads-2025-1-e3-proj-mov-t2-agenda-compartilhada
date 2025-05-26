import { Document } from 'mongoose';

export interface Evento extends Document {
  titulo: string;
  descricao?: string;
  dataEvento: Date;
  tipo: 'individual' | 'grupo';
  grupoId?: string;
  dataFimEvento?: Date;
  duration: number;
}
