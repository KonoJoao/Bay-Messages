import { Test, TestingModule } from '@nestjs/testing';
import { ModeradorController } from './moderador.controller';

describe('ModeradorController', () => {
  let controller: ModeradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeradorController],
    }).compile();

    controller = module.get<ModeradorController>(ModeradorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
