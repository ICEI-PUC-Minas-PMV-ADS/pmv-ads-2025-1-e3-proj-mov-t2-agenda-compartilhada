import { Test, TestingModule } from '@nestjs/testing';
import { EventosGrupoService } from './eventos-grupo.service';

describe('EventosGrupoService', () => {
  let service: EventosGrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosGrupoService],
    }).compile();

    service = module.get<EventosGrupoService>(EventosGrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
