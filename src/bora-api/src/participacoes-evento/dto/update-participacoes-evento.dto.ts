import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipacaoEventoDto } from './create-participacoes-evento.dto';

export class UpdateParticipacaoEventoDto extends PartialType(
  CreateParticipacaoEventoDto,
) {}
