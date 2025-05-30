import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { Evento, EventoSchema } from './schema/eventos.schema';
import { EventosRepository } from './repository/eventos.repository';
import { EventosGruposModule } from 'src/eventos-grupo/eventos-grupo.module';
import { EventosIndividuaisModule } from 'src/eventos-individuais/eventos-individuais.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }]),
    forwardRef(() => EventosGruposModule),
    forwardRef(() => EventosIndividuaisModule)
  ],
  controllers: [EventosController],
  providers: [EventosRepository, EventosService],
  exports: [EventosService],
})
export class EventosModule {}
