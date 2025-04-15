import { Test, TestingModule } from '@nestjs/testing';
import { RecoveryController } from './recuperacao-senha.controller';
import { RecoveryService } from './recuperacao-senha.service';

describe('RecoveryController', () => {
  let controller: RecoveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecoveryController],
      providers: [RecoveryService],
    }).compile();

    controller = module.get<RecoveryController>(RecoveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
