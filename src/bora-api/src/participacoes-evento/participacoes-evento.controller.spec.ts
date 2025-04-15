import { Test, TestingModule } from '@nestjs/testing';
import { ParticipacoesEventoController } from './participacoes-evento.controller';
import { ParticipacoesEventoService } from './participacoes-evento.service';

describe('ParticipacoesEventoController', () => {
  let controller: ParticipacoesEventoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipacoesEventoController],
      providers: [ParticipacoesEventoService],
    }).compile();

    controller = module.get<ParticipacoesEventoController>(ParticipacoesEventoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
