import { Inject, Injectable } from "@nestjs/common";
import { ChatService } from "src/chat/chat.service";
import { Message } from "./message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageDto } from "./message.dto";

@Injectable()
export class MessageService {
  constructor(
    @Inject()
    private readonly chatService: ChatService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}
  async cadastrarMessage(novoMessage: MessageDto, id: Number) {
    try {
      const message = new Message();
      message.text = novoMessage.text;
      message.telefone = novoMessage.telefone;
      message.createdAt = new Date();
      message.chat = await this.chatService.buscarChat(id);
      // console.log(message);
      return await this.messageRepository.save(message);
    } catch (error) {
      return error;
    }
  }
}
