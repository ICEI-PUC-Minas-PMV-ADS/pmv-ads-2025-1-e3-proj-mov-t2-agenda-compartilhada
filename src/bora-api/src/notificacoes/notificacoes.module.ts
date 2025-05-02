import { Module } from '@nestjs/common';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesRepository } from './repository/notificacoes.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Notificacao, NotificacaoSchema } from './schema/notificacoes.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notificacao.name, schema: NotificacaoSchema }]),
    UsersModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },  // Tempo de expiração do token
    }),
  ],
  controllers: [NotificacoesController],
  providers: [NotificacoesService, NotificacoesRepository],
})
export class NotificacoesModule {}
