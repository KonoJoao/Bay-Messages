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
import { ModeradorService } from "../moderador/moderador.service";

@Injectable()
export class MessageService {
  constructor(
    @Inject()
    private readonly usuarioService: UsuarioService,
    @Inject()
    private readonly chatService: ChatService,
    @Inject()
    private readonly moderadorService: ModeradorService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  async validarAcesso(id: Number, telefone: string) {
    try {
      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);
      const chat: Chat = await this.chatService.buscarChat(id);

      if (usuario.banidoAte > new Date())
        throw new UnauthorizedException("O usuário ainda está banido!");

      if (!chat.usuarios.some((element) => element.id === usuario.id))
        throw new UnauthorizedException("O usuário não está nesse chat!");

      return chat;
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
      const chat = await this.validarAcesso(id, novoMessage.telefone);
      console.log(chat);
      if (
        chat?.bloqueados &&
        chat?.bloqueados.find(
          (usuarios) => novoMessage.telefone === usuarios.telefone
        )
      )
        throw new UnauthorizedException("O usuário está bloqueado nesse chat");
      message.chat = chat;
      message.telefone = novoMessage.telefone;
      message.createdAt = new Date();
      message.censurado = false;
      message.text = novoMessage.text;
      const censura = await this.moderadorService.verificarMensagem(
        message.text,
        "IMORALIDADE",
        new Date(),
        +chat.id,
        novoMessage.telefone
      );

      if (censura.status) {
        throw new BadRequestException(censura.banimento.message);
      }

      if (censura?.message && censura?.originalMessage) {
        message.text = message.text.replaceAll(
          censura.originalMessage,
          censura.message
        );
      }

      const result = await this.messageRepository.save(message);
      return result;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        e.response || "Erro ao cadastrar mensagem",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async buscarMessage(id: Number, telefone: string) {
    try {
      const chat = await this.validarAcesso(id, telefone);
      const result = await this.messageRepository.find({
        where: { chat },
        order: {
          createdAt: {},
        },
      });
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

      const censura = await this.moderadorService.verificarMensagem(
        text,
        "IMORALIDADE",
        new Date(),
        0
      );

      if (censura.status) {
        throw new BadRequestException(censura.banimento.message);
      }

      if (censura?.message && censura?.originalMessage) {
        text = text.replaceAll(censura.originalMessage, censura.message);
      }
      mensagem.text = text;
      return await this.messageRepository.save(mensagem);
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
