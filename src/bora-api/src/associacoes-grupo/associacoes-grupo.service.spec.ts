import { Test, TestingModule } from '@nestjs/testing';
import { AssociacoesGrupoService } from './associacoes-grupo.service';

describe('AssociacoesGrupoService', () => {
  let service: AssociacoesGrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociacoesGrupoService],
    }).compile();

    service = module.get<AssociacoesGrupoService>(AssociacoesGrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
