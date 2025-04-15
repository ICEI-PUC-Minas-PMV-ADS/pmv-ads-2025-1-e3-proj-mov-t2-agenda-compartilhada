import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';
import { Notificacao, NotificacaoSchema } from './schema/natificacoes.schema';
import { NotificacoesRepository } from './repository/notificacoes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notificacao.name, schema: NotificacaoSchema }]),
  ],
  controllers: [NotificacoesController],
  providers: [NotificacoesRepository, NotificacoesService],
  exports: [NotificacoesService],
})
export class NotificacoesModule {}
