import { Document } from 'mongoose';

export interface AssociacaoGrupo extends Document {
  grupoId: string;
  associadoId: string;
  papel?: string;
}
