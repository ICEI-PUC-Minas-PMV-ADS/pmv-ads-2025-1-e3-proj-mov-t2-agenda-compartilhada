import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarioEventoDto } from './create-calendarios-evento.dto';

export class UpdateCalendarioEventoDto extends PartialType(
  CreateCalendarioEventoDto,
) {}
