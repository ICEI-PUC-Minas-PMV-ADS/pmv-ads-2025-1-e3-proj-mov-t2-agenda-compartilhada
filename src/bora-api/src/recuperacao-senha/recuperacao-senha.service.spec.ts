import { Test, TestingModule } from '@nestjs/testing';
import { RecoveryService } from './recuperacao-senha.service';

describe('RecoveryService', () => {
  let service: RecoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecoveryService],
    }).compile();

    service = module.get<RecoveryService>(RecoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
