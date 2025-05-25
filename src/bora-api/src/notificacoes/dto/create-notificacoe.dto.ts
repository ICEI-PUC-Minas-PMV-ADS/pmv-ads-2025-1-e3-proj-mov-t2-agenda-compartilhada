import { IsString, IsNotEmpty, IsBoolean, IsDate, IsIn, IsOptional, IsObject } from 'class-validator';

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

  @IsString()
  @IsIn(['comum', 'convite'])
  readonly tipo: string;

  @IsOptional()
  @IsObject()
  readonly dadosExtras?: Record<string, any>;
}
