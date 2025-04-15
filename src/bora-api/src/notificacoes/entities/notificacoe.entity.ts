import { Document } from 'mongoose';

export interface Notificacao extends Document {
  usuarioId: string;
  mensagem: string;
  lida: boolean;
}
