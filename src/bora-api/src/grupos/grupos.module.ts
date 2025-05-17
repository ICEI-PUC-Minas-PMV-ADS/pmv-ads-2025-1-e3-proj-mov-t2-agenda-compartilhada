import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GruposController } from './grupos.controller';
import { GruposService } from './grupos.service';
import { Grupo, GrupoSchema } from './schema/grupos.schema';
import { GruposRepository } from './repository/grupos.repository';
import { PerfisModule } from '../perfis/perfis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grupo.name, schema: GrupoSchema }]),
    PerfisModule,
  ],
  controllers: [GruposController],
  providers: [GruposRepository, GruposService],
  exports: [GruposService],
})
export class GruposModule {}
