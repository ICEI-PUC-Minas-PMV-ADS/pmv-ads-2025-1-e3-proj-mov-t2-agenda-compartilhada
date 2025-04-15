import { Test, TestingModule } from '@nestjs/testing';
import { ParticipacoesEventoService } from './participacoes-evento.service';

describe('ParticipacoesEventoService', () => {
  let service: ParticipacoesEventoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipacoesEventoService],
    }).compile();

    service = module.get<ParticipacoesEventoService>(ParticipacoesEventoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
