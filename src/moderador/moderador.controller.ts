import { Body, Controller, Post } from "@nestjs/common";
import { ModeradorService, ReturnSchema } from "./moderador.service";
import { BanimentoDto } from "./moderador.dto";
@Controller("moderador")
export class ModeradorController {
  constructor(private readonly moderadorService: ModeradorService) {}

  @Post("analisar-banimento")
  async buscar(@Body() body: BanimentoDto): Promise<any> {
    const { mensagem, motivo, dataDenuncia, chatId, userId } = body;
    const response = await this.moderadorService.verificarMensagem(
      mensagem,
      motivo,
      dataDenuncia,
      chatId
    );
    if (response.status) {
      // //usuário com penalidade
      // return this.moderadorService.banirUsuario({
      //   id: userId,
      //   banidoAte: response.banimento.data,
      // });
    }

    return response.message;
  }
}
