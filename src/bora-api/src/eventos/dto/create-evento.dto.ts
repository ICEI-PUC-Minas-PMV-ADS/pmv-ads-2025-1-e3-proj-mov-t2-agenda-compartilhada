export class CreateEventoDto {
  readonly titulo: string;
  readonly descricao?: string;
  readonly dataEvento: Date;
  readonly dataFimEvento?: Date;
  readonly tipo: 'individual' | 'grupo';
  readonly donoId?: string;
  readonly confirmados: string[];
  readonly recusas: string[];
}
