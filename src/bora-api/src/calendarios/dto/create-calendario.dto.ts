export class CreateCalendarioDto {
  readonly ownerId: string;
  readonly tipo: 'usuario' | 'grupo';
  readonly eventos?: string[]; // Lista de IDs de eventos
}
