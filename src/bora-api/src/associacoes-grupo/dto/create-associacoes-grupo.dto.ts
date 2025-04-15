export class CreateAssociacaoGrupoDto {
  readonly grupoId: string;
  readonly associadoId: string;
  readonly papel?: string; // ex.: 'membro', 'admin', etc.
}
