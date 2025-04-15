import { Test, TestingModule } from '@nestjs/testing';
import { EventosIndividuaisService } from './eventos-individuais.service';

describe('EventosIndividuaisService', () => {
  let service: EventosIndividuaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosIndividuaisService],
    }).compile();

    service = module.get<EventosIndividuaisService>(EventosIndividuaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
