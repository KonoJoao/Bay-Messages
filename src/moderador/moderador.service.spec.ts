import { Test, TestingModule } from '@nestjs/testing';
import { ModeradorService } from './moderador.service';

describe('ModeradorService', () => {
  let service: ModeradorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModeradorService],
    }).compile();

    service = module.get<ModeradorService>(ModeradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
