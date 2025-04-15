import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarioDto } from './create-calendario.dto';

export class UpdateCalendarioDto extends PartialType(CreateCalendarioDto) {}
