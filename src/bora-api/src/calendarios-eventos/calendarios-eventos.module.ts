import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendariosEventosController } from './calendarios-eventos.controller';
import { CalendariosEventosService } from './calendarios-eventos.service';
import { CalendarioEvento, CalendarioEventoSchema } from './schema/calendario-eventos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CalendarioEvento.name, schema: CalendarioEventoSchema },
    ]),
  ],
  controllers: [CalendariosEventosController],
  providers: [CalendariosEventosService],
  exports: [CalendariosEventosService],
})
export class CalendariosEventosModule {}
