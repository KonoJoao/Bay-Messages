import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GrupoDto } from "src/chat/grupo.dto";
import { MessageService } from "./message.service";
import { MessageDto } from "./message.dto";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post("/:id")
  async cadastrarMessage(
    @Body() novoMessage: MessageDto,
    @Param("id") id: Number
  ): Promise<any> {
    return await this.messageService.cadastrarMessage(novoMessage, id);
  }
  @Get("/:id")
  async buscarMessage(@Param("id") id: Number) {
    return await this.messageService.buscarMessage(id);
  }
}
