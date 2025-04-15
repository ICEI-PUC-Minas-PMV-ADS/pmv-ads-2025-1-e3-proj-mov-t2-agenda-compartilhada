import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { Evento, EventoSchema } from './schema/eventos.schema';
import { EventosRepository } from './repository/eventos.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }]),
  ],
  controllers: [EventosController],
  providers: [EventosRepository, EventosService],
  exports: [EventosService],
})
export class EventosModule {}
