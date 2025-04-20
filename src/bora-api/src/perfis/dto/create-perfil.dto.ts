import { Types } from 'mongoose';

export class CreatePerfilDto {
  _id: Types.ObjectId;  // ID do perfil será o mesmo do usuário
  nome: string;
  foto: string | null;  // Foto pode ser uma string ou null
  tipoDono?: 'usuario' | 'grupo';  // O tipoDono será atribuído no momento do cadastro
  userId: Types.ObjectId;  // ID do usuário que é referência
}
