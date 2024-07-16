import { Body, Controller, Get, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatDto } from "./chat.dto";
import { GrupoDto } from "./grupo.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  cadastrarGrupo(@Body() novoChat: GrupoDto): Promise<any> {
    return this.chatService.cadastrarGrupo(novoChat);
  }
}
