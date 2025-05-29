import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GruposController } from './grupos.controller';
import { GruposService } from './grupos.service';
import { Grupo, GrupoSchema } from './schema/grupos.schema';
import { GruposRepository } from './repository/grupos.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grupo.name, schema: GrupoSchema }]),
    UsersModule,
  ],
  controllers: [GruposController],
  providers: [GruposRepository, GruposService],
  exports: [GruposService, GruposRepository],
})
export class GruposModule {}
