import { ArrayMinSize, ArrayNotEmpty } from "class-validator";

export class CreateGrupoDto {
  readonly nome: string;
  readonly descricao?: string;
  readonly membros: string[]; // Array de emails de usuários
  readonly grupoAdmins: string []; // Array de emails de admins
}
