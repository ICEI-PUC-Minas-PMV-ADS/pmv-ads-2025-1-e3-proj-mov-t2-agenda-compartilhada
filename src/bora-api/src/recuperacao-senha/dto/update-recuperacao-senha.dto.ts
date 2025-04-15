import { PartialType } from '@nestjs/mapped-types';
import { CreateRecoveryDto } from './create-recuperacao-senha.dto';

export class UpdateRecoveryDto extends PartialType(CreateRecoveryDto) {}
