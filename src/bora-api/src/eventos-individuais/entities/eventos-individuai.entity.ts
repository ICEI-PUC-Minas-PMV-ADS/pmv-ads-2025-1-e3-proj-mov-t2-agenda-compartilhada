import { Document } from 'mongoose';

export interface EventoIndividual extends Document {
  eventoId: string;
  usuarioId: string;
}
