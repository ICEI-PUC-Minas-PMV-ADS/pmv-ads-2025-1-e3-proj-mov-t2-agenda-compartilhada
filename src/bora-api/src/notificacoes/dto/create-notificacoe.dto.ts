export class CreateNotificacaoDto {
  readonly usuarioId: string;
  readonly mensagem: string;
  readonly lida?: boolean;
}
