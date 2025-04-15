import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoIndividualDto } from './create-eventos-individuai.dto';

export class UpdateEventoIndividualDto extends PartialType(
  CreateEventoIndividualDto,
) {}
