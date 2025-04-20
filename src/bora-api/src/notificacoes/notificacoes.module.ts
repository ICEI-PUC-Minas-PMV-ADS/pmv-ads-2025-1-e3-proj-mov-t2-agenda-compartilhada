import { Module } from '@nestjs/common';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesRepository } from './repository/notificacoes.repository';
import { MongooseModule } from '@nestjs/mongoose';  // Importando MongooseModule
import { Notificacao, NotificacaoSchema } from './schema/notificacoes.schema';  // Importando o schema de Notificacao
import { JwtModule } from '@nestjs/jwt';  // Importando JwtModule
import { UsersModule } from '../users/users.module';  // Importando o UsersModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notificacao.name, schema: NotificacaoSchema }]),  // Registrando o modelo Notificacao
    UsersModule,  // Agora o NotificacoesModule tem acesso ao UserModel
    JwtModule.register({
      secret: 'your-secret-key',  // Use uma chave secreta segura ou uma variável de ambiente
      signOptions: { expiresIn: '1h' },  // Tempo de expiração do token (opcional)
    }),
  ],
  controllers: [NotificacoesController],
  providers: [NotificacoesService, NotificacoesRepository],
})
export class NotificacoesModule {}
