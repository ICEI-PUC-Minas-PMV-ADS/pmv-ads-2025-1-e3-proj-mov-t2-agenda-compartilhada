import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoGrupoDto } from './create-eventos-grupo.dto';

export class UpdateEventoGrupoDto extends PartialType(CreateEventoGrupoDto) {}
