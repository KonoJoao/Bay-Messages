import { Body, Controller, Post } from "@nestjs/common";
import { ModeradorService, ReturnSchema } from "./moderador.service";
import { BanimentoDto, DesbanimentoDto } from "./moderador.dto";
@Controller("moderador")
export class ModeradorController {
  constructor(private readonly moderadorService: ModeradorService) {}

  @Post("denunciarContato")
  async buscar(@Body() body: BanimentoDto): Promise<any> {
    const { mensagem, motivo, dataDenuncia, chatId, telefone } = body;
    const response = await this.moderadorService.verificarMensagem(
      mensagem,
      motivo,
      dataDenuncia,
      chatId
    );
    if (response.status) {
      //usuário com penalidade
      return this.moderadorService.banirUsuario({
        telefone: telefone,
        banidoAte: response.banimento.data,
      });
    }

    return response.message;
  }

  @Post("desbloquearContato")
  async desbanirUsuario(@Body() body: DesbanimentoDto): Promise<any> {
    return await this.moderadorService.desbanirUsuario(body);
  }
}
