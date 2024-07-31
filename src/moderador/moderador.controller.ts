import { Body, Controller, Post } from "@nestjs/common";
import { ModeradorService, ReturnSchema } from "./moderador.service";
import { BanimentoDto, DesbanimentoDto } from "./moderador.dto";
import { UsuarioService } from "src/usuario/usuario.service";
@Controller("moderador")
export class ModeradorController {
  constructor(
    private readonly moderadorService: ModeradorService,
    private readonly usuarioService: UsuarioService
  ) {}

  @Post("denunciarContato")
  async buscar(@Body() body: BanimentoDto): Promise<any> {
    const { mensagem, motivo, chatId, telefone } = body;
    const response = await this.moderadorService.verificarMensagem(
      mensagem,
      motivo,
      new Date(),
      chatId,
      telefone
    );
    if (response.status) {
      //usuário com penalidade
      return this.usuarioService.banirUsuario(
        telefone,
        response.banimento.data
      );
    }

    return response.message;
  }

  @Post("desbloquearContato")
  async desbanirUsuario(@Body() body: DesbanimentoDto): Promise<any> {
    return await this.moderadorService.desbanirUsuario(body);
  }
}
