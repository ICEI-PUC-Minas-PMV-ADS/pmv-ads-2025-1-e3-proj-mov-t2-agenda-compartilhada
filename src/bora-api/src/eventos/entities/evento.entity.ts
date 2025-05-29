import { Document } from 'mongoose';

export interface Evento extends Document {
  titulo: string;
  descricao?: string;
  dataEvento: Date;
  dataFimEvento?: Date;
  tipo: 'individual' | 'grupo';
  donoId: string;
  confirmados: string[];
  recusas: string[];
}
