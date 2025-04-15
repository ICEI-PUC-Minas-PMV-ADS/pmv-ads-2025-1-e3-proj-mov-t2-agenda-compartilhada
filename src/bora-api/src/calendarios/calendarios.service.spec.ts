import { Test, TestingModule } from '@nestjs/testing';
import { CalendariosService } from './calendarios.service';

describe('CalendariosService', () => {
  let service: CalendariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendariosService],
    }).compile();

    service = module.get<CalendariosService>(CalendariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
