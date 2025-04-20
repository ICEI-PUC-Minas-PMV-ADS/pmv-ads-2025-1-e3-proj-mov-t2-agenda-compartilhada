import { IsString, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';

export class CreateNotificacaoDto {
  @IsString()
  @IsNotEmpty()
  readonly usuarioId: string;

  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  readonly mensagem: string;

  @IsDate()
  readonly data: Date;

  @IsBoolean()
  readonly lido: boolean;  // Tornamos 'lido' obrigatório e não opcional

  // 'notificationId' não precisa ser passado pelo usuário, será gerado automaticamente no service.
}
