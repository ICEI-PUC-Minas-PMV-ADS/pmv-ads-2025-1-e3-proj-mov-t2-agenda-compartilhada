export class CreateGrupoDto {
  readonly nome: string;
  readonly descricao?: string;
  readonly membros?: string[]; // Array de IDs de usuários
}
