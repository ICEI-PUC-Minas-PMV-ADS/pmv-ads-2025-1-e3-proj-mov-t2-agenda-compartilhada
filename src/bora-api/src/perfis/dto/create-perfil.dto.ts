import { Types } from 'mongoose';

export class CreatePerfilDto {
  _id: Types.ObjectId;
  nome: string;
  foto: string | null;
  tipoDono?: 'usuario' | 'grupo';
  userId: Types.ObjectId;
}
