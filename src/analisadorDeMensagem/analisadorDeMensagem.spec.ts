import { Test, TestingModule } from "@nestjs/testing";
import { AnalisadorDeMensagemService } from "./analisadorDeMensagem.service";

describe("AnalisadorDeMensagemService", () => {
  let service: AnalisadorDeMensagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalisadorDeMensagemService],
    }).compile();

    service = module.get<AnalisadorDeMensagemService>(
      AnalisadorDeMensagemService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
