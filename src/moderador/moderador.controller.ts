import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ModeradorService, ReturnSchema } from "./moderador.service";
import { BanimentoDto, DesbanimentoDto } from "./moderador.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
@Controller("moderador")
@UseGuards(JwtAuthGuard)
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
      await this.usuarioService.banirUsuario(telefone, response.banimento.data);
    }

    return response;
  }

  @Post("desbloquearContato")
  async desbanirUsuario(@Body() body: DesbanimentoDto): Promise<any> {
    return await this.moderadorService.desbanirUsuario(body);
  }
}
