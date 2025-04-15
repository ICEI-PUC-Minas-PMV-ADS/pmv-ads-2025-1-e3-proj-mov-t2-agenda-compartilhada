import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoDto } from './create-grupo.dto';

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {}
