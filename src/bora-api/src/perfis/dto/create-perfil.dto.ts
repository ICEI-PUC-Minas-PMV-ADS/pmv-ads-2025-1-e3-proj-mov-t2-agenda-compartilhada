import { Types } from 'mongoose';

export class CreatePerfilDto {
  _id: Types.ObjectId;
  nome: string;
  foto: string;
  tipoDono?: 'usuario' | 'grupo';
  userId: Types.ObjectId;
}
