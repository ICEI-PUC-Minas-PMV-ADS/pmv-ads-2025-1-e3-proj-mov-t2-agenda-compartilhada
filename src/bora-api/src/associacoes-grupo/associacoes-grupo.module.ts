import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssociacoesGrupoController } from './associacoes-grupo.controller';
import { AssociacoesGrupoService } from './associacoes-grupo.service';
import {
  AssociacaoGrupo,
  AssociacaoGrupoSchema,
} from './schema/associacoes-grupo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssociacaoGrupo.name, schema: AssociacaoGrupoSchema },
    ]),
  ],
  controllers: [AssociacoesGrupoController],
  providers: [AssociacoesGrupoService],
  exports: [AssociacoesGrupoService],
})
export class AssociacoesGrupoModule {}
