import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatDto } from "./chat.dto";
import { GrupoDto } from "./grupo.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConversaPrivadaDto } from "./conversaPrivada.dto";

@Controller("chat")
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post("grupo")
  async cadastrarGrupo(@Body() novoChat: GrupoDto): Promise<any> {
    return await this.chatService.cadastrarGrupo(novoChat);
  }
  @Post("adicionar")
  async adicionarMembro(
    @Body("id") id: Number,
    @Body("telefone") telefone: string
  ): Promise<any> {
    return await this.chatService.adicionarMembro(id, telefone);
  }
  @Post("remover")
  async removerMembro(
    @Body("id") id: Number,
    @Body("telefone") telefone: string
  ): Promise<any> {
    return await this.chatService.removerMembro(id, telefone);
  }
  @Post("conversa")
  async cadastrarConversaPrivada(
    @Body() novoChat: ConversaPrivadaDto
  ): Promise<any> {
    return await this.chatService.cadastrarConversaPrivada(novoChat);
  }
}
