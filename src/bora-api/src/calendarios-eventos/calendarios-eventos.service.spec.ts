import { Test, TestingModule } from '@nestjs/testing';
import { CalendariosEventosService } from './calendarios-eventos.service';

describe('CalendariosEventosService', () => {
  let service: CalendariosEventosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendariosEventosService],
    }).compile();

    service = module.get<CalendariosEventosService>(CalendariosEventosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
