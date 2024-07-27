import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ChatService } from "../chat/chat.service";
import { Message } from "./message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageDto } from "./message.dto";
import { UsuarioService } from "../usuario/usuario.service";
import { Chat } from "../chat/chat.entity";
import { Usuario } from "../usuario/usuario.entity";

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

  async validarAcesso(id: Number, telefone: string) {
    try {
      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);
      const chat: Chat = await this.chatService.buscarChat(id);

      console.log(usuario, chat);

      if (!chat.usuarios.some((element) => element.id === usuario.id))
        throw new UnauthorizedException("O usuário não está nesse chat!");

      return { chat };
    } catch (e) {
      console.error(e);
      throw new HttpException(
        e.response || "Erro ao validar Acesso",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async cadastrarMessage(novoMessage: MessageDto, id: Number) {
    try {
      const message = new Message();
      const { chat } = await this.validarAcesso(id, novoMessage.telefone);
      message.chat = chat;
      message.telefone = novoMessage.telefone;
      message.createdAt = new Date();
      message.censurado = false;
      message.text = novoMessage.text;
      const result = await this.messageRepository.save(message);
      return result;
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao cadastrar mensagem",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async buscarMessage(id: Number, telefone: string) {
    try {
      const { chat } = await this.validarAcesso(id, telefone);
      const result = await this.messageRepository.find({
        where: { chat },
        order: {
          createdAt: {},
        },
      });
      // console.log(result);
      return result;
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao buscar mensagens",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async buscarUnicaMessage(id: Number, telefone: string) {
    try {
      const message = await this.messageRepository.findOne({
        where: {
          idMessage: id,
        },
        relations: ["chat"],
      });
      console.log(message, telefone);
      await this.validarAcesso(message.chat.id, telefone);
      return message;
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao buscar mensagem",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async editarMessage(id: Number, telefone: string, text: string) {
    try {
      const mensagem = await this.buscarUnicaMessage(id, telefone);
      if (!mensagem) throw new BadRequestException("Mensagem não encontrada!");
      mensagem.text = text;
      const result = await this.messageRepository.save(mensagem);
      return { result };
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao editar mensagem",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deletarMessage(id: Number, telefone: string) {
    try {
      const mensagem = await this.buscarUnicaMessage(id, telefone);
      if (!mensagem) throw new BadRequestException("Mensagem não encontrada!");
      await this.messageRepository.delete(+mensagem.idMessage);
      return { message: `Mensagem de id ${id} deletada` };
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao deletar mensagem",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
