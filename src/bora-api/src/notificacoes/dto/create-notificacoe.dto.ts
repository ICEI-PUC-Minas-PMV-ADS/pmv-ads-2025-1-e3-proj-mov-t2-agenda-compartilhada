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
  readonly lido: boolean;
}
