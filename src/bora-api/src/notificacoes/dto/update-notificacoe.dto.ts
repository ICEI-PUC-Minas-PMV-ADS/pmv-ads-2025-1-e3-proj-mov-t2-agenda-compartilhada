import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacaoDto } from './create-notificacoe.dto';

export class UpdateNotificacaoDto extends PartialType(CreateNotificacaoDto) {}
