import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosIndividuaisController } from './eventos-individuais.controller';
import { EventosIndividuaisService } from './eventos-individuais.service';
import {
  EventoIndividual,
  EventoIndividualSchema,
} from './schema/eventos-individuais.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventoIndividual.name, schema: EventoIndividualSchema },
    ]),
  ],
  controllers: [EventosIndividuaisController],
  providers: [EventosIndividuaisService],
  exports: [EventosIndividuaisService],
})
export class EventosIndividuaisModule {}
