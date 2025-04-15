import { Test, TestingModule } from '@nestjs/testing';
import { EventosGrupoController } from './eventos-grupo.controller';
import { EventosGrupoService } from './eventos-grupo.service';

describe('EventosGrupoController', () => {
  let controller: EventosGrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventosGrupoController],
      providers: [EventosGrupoService],
    }).compile();

    controller = module.get<EventosGrupoController>(EventosGrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
