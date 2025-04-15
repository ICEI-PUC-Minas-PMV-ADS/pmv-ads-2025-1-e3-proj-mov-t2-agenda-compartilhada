import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerfisController } from './perfis.controller';
import { PerfisService } from './perfis.service';
import { Perfil, PerfilSchema } from './schema/perfis.schema';
import { PerfisRepository } from './repository/perfis.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Perfil.name, schema: PerfilSchema }]),
  ],
  controllers: [PerfisController],
  providers: [PerfisRepository, PerfisService],
  exports: [PerfisService],
})
export class PerfisModule {}
