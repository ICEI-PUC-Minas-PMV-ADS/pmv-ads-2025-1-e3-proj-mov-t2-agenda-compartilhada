import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendariosController } from './calendarios.controller';
import { CalendariosService } from './calendarios.service';
import { Calendario, CalendarioSchema } from './schema/calendarios.schema';
import { CalendariosRepository } from './repository/calendarios.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Calendario.name, schema: CalendarioSchema }]),
  ],
  controllers: [CalendariosController],
  providers: [CalendariosRepository, CalendariosService],
  exports: [CalendariosService],
})
export class CalendariosModule {}
