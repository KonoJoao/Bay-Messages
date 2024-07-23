import { Body, Controller, Post } from "@nestjs/common";
import { ModeradorService, ReturnSchema } from "./moderador.service";
import { BanimentoDto } from "./moderador.dto";
@Controller("moderador")
export class ModeradorController {
  constructor(private readonly moderadorService: ModeradorService) {}

  @Post("analisar-banimento")
  async buscar(@Body() body: BanimentoDto): Promise<any> {
    const { mensagem, motivo, dataDenuncia, chatId, userId } = body;
    return this.moderadorService.verificarMensagem(
      mensagem,
      motivo,
      dataDenuncia,
      chatId,
      userId
    );
  }
}
