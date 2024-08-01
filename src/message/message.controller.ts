import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { GrupoDto } from "src/chat/grupo.dto";
import { MessageService } from "./message.service";
import { MessageDto } from "./message.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("message")
@UseGuards(JwtAuthGuard)
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
  async buscarMessage(
    @Param("id") id: Number,
    @Query("telefone") telefone: string
  ) {
    return await this.messageService.buscarMessage(id, telefone);
  }
  @Patch("/:id")
  async editarMessage(
    @Param("id") id: Number,
    @Query("telefone") telefone: string,
    @Query("text") text: string
  ) {
    return await this.messageService.editarMessage(id, telefone, text);
  }
  @Delete("/:id")
  async deletarMessage(
    @Param("id") id: Number,
    @Query("telefone") telefone: string
  ) {
    return await this.messageService.deletarMessage(id, telefone);
  }
}
