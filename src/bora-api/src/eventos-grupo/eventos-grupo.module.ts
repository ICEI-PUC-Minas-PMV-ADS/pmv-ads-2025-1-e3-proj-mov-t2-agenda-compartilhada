import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventoGrupo, EventoGrupoSchema } from './schema/eventos-grupo.schema';
import { EventosGrupoController } from './eventos-grupo.controller';
import { EventosGrupoService } from './eventos-grupo.service';
import { EventosModule } from 'src/eventos/eventos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventoGrupo.name, schema: EventoGrupoSchema },
    ]),
    forwardRef(() => EventosModule)
  ],
  controllers: [EventosGrupoController],
  providers: [EventosGrupoService],
  exports: [EventosGrupoService],
})
export class EventosGruposModule {}
