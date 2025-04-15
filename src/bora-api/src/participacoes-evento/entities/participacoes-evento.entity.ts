import { Document } from 'mongoose';

export interface ParticipacaoEvento extends Document {
  eventoId: string;
  usuarioId: string;
  status?: string;
}
