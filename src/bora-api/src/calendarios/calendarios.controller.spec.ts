import { Test, TestingModule } from '@nestjs/testing';
import { CalendariosController } from './calendarios.controller';
import { CalendariosService } from './calendarios.service';

describe('CalendariosController', () => {
  let controller: CalendariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendariosController],
      providers: [CalendariosService],
    }).compile();

    controller = module.get<CalendariosController>(CalendariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
