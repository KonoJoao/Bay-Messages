import { Controller, Get } from "@nestjs/common";
import { ModeradorService } from "./moderador.service";

@Controller("moderador")
export class ModeradorController {
  constructor(private readonly moderadorService: ModeradorService) {}
  @Get("info")
  async buscar(): Promise<any> {
    return this.moderadorService.verificarMensagem(
      "puta",
      "IMORALIDADE",
      new Date(),
      1
    );
  }
}
