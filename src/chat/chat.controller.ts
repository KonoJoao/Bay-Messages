import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
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
  @Get("grupo/:id")
  async listarMembros(@Param("id") id: Number): Promise<any> {
    return await this.chatService.listarMembros(id);
  }
  @Post("adicionar")
  async adicionarMembro(
    @Body("id") id: Number,
    @Body("telefone") telefone: string,
    @Body("administrador") administrador: string
  ): Promise<any> {
    return await this.chatService.adicionarMembro(id, telefone, administrador);
  }
  @Post("remover")
  async removerMembro(
    @Body("id") id: Number,
    @Body("telefone") telefone: string,
    @Body("administrador") administrador: string
  ): Promise<any> {
    return await this.chatService.removerMembro(id, telefone, administrador);
  }
  @Post("conversa")
  async cadastrarConversaPrivada(
    @Body() novoChat: ConversaPrivadaDto
  ): Promise<any> {
    return await this.chatService.cadastrarConversaPrivada(novoChat);
  }
  @Delete("/:id")
  async deletarChat(@Param("id") id: Number): Promise<any> {
    return await this.chatService.deletarChat(id);
  }
}
