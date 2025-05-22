import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { Evento, EventoSchema } from './schema/eventos.schema';
import { EventosRepository } from './repository/eventos.repository';
import { EventosGruposModule } from 'src/eventos-grupo/eventos-grupo.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }]),
    forwardRef(() => EventosGruposModule)
  ],
  controllers: [EventosController],
  providers: [EventosRepository, EventosService],
  exports: [EventosService],
})
export class EventosModule {}
