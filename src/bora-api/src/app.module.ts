// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PerfisModule } from './perfis/perfis.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { EventosModule } from './eventos/eventos.module';
import { EventosIndividuaisModule } from './eventos-individuais/eventos-individuais.module';
import { EventosGruposModule } from './eventos-grupo/eventos-grupo.module';
import { GruposModule } from './grupos/grupos.module';
import { AssociacoesGrupoModule } from './associacoes-grupo/associacoes-grupo.module';
import { ParticipacoesEventoModule } from './participacoes-evento/participacoes-evento.module';
import { CalendariosModule } from './calendarios/calendarios.module';
import { CalendariosEventosModule } from './calendarios-eventos/calendarios-eventos.module';
import { RecoveryModule } from './recuperacao-senha/recuperacao-senha.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/agenda'),  // Configuração do MongoDB
    UsersModule,  // Módulo de Usuários
    AuthModule,   // Módulo de Autenticação (contém o JwtService)
    PerfisModule,
    NotificacoesModule,
    EventosModule,
    EventosIndividuaisModule,
    EventosGruposModule,
    GruposModule,
    AssociacoesGrupoModule,
    ParticipacoesEventoModule,
    CalendariosModule,
    CalendariosEventosModule,
    RecoveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
