import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipacoesEventoController } from './participacoes-evento.controller';
import { ParticipacoesEventoService } from './participacoes-evento.service';
import {
  ParticipacaoEvento,
  ParticipacaoEventoSchema,
} from './schema/participacoes-evento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParticipacaoEvento.name, schema: ParticipacaoEventoSchema },
    ]),
  ],
  controllers: [ParticipacoesEventoController],
  providers: [ParticipacoesEventoService],
  exports: [ParticipacoesEventoService],
})
export class ParticipacoesEventoModule {}
