import { PartialType } from '@nestjs/mapped-types';
import { CreateAssociacaoGrupoDto } from './create-associacoes-grupo.dto';

export class UpdateAssociacaoGrupoDto extends PartialType(CreateAssociacaoGrupoDto) {}
