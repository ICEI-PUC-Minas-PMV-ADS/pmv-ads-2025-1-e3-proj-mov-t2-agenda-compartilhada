import { Document } from 'mongoose';

export interface Grupo extends Document {
  nome: string;
  descricao?: string;
  membros: string[];
}
