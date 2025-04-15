export class CreateParticipacaoEventoDto {
  readonly eventoId: string;
  readonly usuarioId: string;
  readonly status?: string; // ex.: 'confirmado', 'pendente', etc.
}
