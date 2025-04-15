import { Test, TestingModule } from '@nestjs/testing';
import { EventosIndividuaisController } from './eventos-individuais.controller';
import { EventosIndividuaisService } from './eventos-individuais.service';

describe('EventosIndividuaisController', () => {
  let controller: EventosIndividuaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventosIndividuaisController],
      providers: [EventosIndividuaisService],
    }).compile();

    controller = module.get<EventosIndividuaisController>(EventosIndividuaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
