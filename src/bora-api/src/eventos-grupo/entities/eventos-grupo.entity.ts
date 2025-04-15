import { Document } from 'mongoose';

export interface EventoGrupo extends Document {
  eventoId: string;
  grupoId: string;
}
