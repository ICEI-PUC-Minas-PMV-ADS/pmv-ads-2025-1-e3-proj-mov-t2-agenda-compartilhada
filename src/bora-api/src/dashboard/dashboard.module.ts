import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { GruposModule } from '../grupos/grupos.module';
import { EventosModule } from '../eventos/eventos.module';
import { EventosIndividuaisModule } from '../eventos-individuais/eventos-individuais.module';
import { ParticipacoesEventoModule } from '../participacoes-evento/participacoes-evento.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    GruposModule,
    EventosModule,
    EventosIndividuaisModule,
    ParticipacoesEventoModule,
    UsersModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
