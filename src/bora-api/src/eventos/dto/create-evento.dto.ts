export class CreateEventoDto {
  readonly titulo: string;
  readonly descricao?: string;
  readonly dataEvento: Date;
  readonly tipo: 'individual' | 'grupo';
  readonly grupoId?: string;
  dataFimEvento?: Date;
  readonly duration: number;
}
