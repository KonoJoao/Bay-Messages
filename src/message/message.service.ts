import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ChatService } from "src/chat/chat.service";
import { Message } from "./message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageDto } from "./message.dto";
import { Chat } from "src/chat/chat.entity";
import { ChatDto } from "src/chat/chat.dto";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
export class MessageService {
  constructor(
    @Inject()
    private readonly usuarioService: UsuarioService,
    @Inject()
    private readonly chatService: ChatService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  async validarMessage(chat: Chat, telefone: string) {
    try {
      const usuario = await this.usuarioService.encontraPorTelefone(telefone);
      return chat.usuarios.includes(usuario);
    } catch (e) {}
  }

  async cadastrarMessage(novoMessage: MessageDto, id: Number) {
    try {
      const message = new Message();
      message.chat = await this.chatService.buscarChat(id);
      message.text = novoMessage.text;
      message.telefone = novoMessage.telefone;
      message.createdAt = new Date();
      if (!this.validarMessage(message.chat, message.telefone))
        throw new UnauthorizedException("O Usuário não está nesse chat.");
      return await this.messageRepository.save(message);
    } catch (error) {
      return error;
    }
  }

  async buscarMessage(chatId: Number) {
    try {
      const chat = await this.chatService.buscarChat(chatId);
      const result = await this.messageRepository.find({
        where: { chat },
        order: {
          createdAt: {},
        },
      });
      console.log(result);
      return result;
    } catch (e) {
      return e;
    }
  }
}
