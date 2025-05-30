import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosIndividuaisController } from './eventos-individuais.controller';
import { EventosIndividuaisService } from './eventos-individuais.service';
import {
  EventoIndividual,
  EventoIndividualSchema,
} from './schema/eventos-individuais.schema';
import { EventosModule } from 'src/eventos/eventos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventoIndividual.name, schema: EventoIndividualSchema },
    ]),
    forwardRef(() => EventosModule)
  ],
  controllers: [EventosIndividuaisController],
  providers: [EventosIndividuaisService],
  exports: [EventosIndividuaisService],
})
export class EventosIndividuaisModule {}
