export class CreateGrupoDto {
  readonly nome: string;
  readonly descricao?: string;
  readonly membros: string[];
  readonly grupoAdmins: string[];
}
