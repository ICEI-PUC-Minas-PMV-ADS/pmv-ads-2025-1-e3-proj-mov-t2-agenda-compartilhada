import { Test, TestingModule } from '@nestjs/testing';
import { CalendariosEventosController } from './calendarios-eventos.controller';
import { CalendariosEventosService } from './calendarios-eventos.service';

describe('CalendariosEventosController', () => {
  let controller: CalendariosEventosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendariosEventosController],
      providers: [CalendariosEventosService],
    }).compile();

    controller = module.get<CalendariosEventosController>(CalendariosEventosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
