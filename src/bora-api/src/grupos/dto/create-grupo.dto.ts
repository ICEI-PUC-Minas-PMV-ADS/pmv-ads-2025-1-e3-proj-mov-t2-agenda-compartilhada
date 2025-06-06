export class CreateGrupoDto {
  readonly nome: string;
  readonly descricao?: string;
  readonly foto?: string; // URL da foto
  readonly membros: string[];
  readonly grupoAdmins: string[];
}
