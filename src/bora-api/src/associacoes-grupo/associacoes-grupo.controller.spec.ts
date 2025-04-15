import { Test, TestingModule } from '@nestjs/testing';
import { AssociacoesGrupoController } from './associacoes-grupo.controller';
import { AssociacoesGrupoService } from './associacoes-grupo.service';

describe('AssociacoesGrupoController', () => {
  let controller: AssociacoesGrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociacoesGrupoController],
      providers: [AssociacoesGrupoService],
    }).compile();

    controller = module.get<AssociacoesGrupoController>(AssociacoesGrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
