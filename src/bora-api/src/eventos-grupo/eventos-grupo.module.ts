import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventoGrupo, EventoGrupoSchema } from './schema/eventos-grupo.schema';
import { EventosGruposController } from './eventos-grupo.controller';
import { EventosGruposService } from './eventos-grupo.service';
import { EventosModule } from 'src/eventos/eventos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventoGrupo.name, schema: EventoGrupoSchema },
    ]),
    forwardRef(() => EventosModule)
  ],
  controllers: [EventosGruposController],
  providers: [EventosGruposService],
  exports: [EventosGruposService],
})
export class EventosGruposModule {}
