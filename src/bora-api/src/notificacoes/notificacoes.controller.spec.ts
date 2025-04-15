import { Test, TestingModule } from '@nestjs/testing';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';

describe('NotificacoesController', () => {
  let controller: NotificacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacoesController],
      providers: [NotificacoesService],
    }).compile();

    controller = module.get<NotificacoesController>(NotificacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
