import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./chat.entity";
import { Repository, In } from "typeorm";
import { ChatDto } from "./chat.dto";
import { GrupoDto } from "./grupo.dto";
import { UsuarioService } from "../usuario/usuario.service";
import { Usuario } from "../usuario/usuario.entity";
import { ConversaPrivadaDto } from "./conversaPrivada.dto";
import { exec } from "child_process";

@Injectable()
export class ChatService {
  constructor(
    @Inject()
    private readonly usuarioService: UsuarioService,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>
  ) {}

  async executeQuery(sql: string) {
    try {
      return await this.chatRepository.query(sql);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.response || "Erro ao executar sql",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verificarEmChatsPrivados(usuario1: Number, usuario2: Number) {
    try {
      const chat = await this.executeQuery(
        `
          SELECT a.chatId, 
                a.usuarioId,
                b.usuarioId
          from chat_usuarios_usuario as a
            INNER JOIN chat_usuarios_usuario as b
            on a.chatId= b.chatId 
            INNER JOIN chat as c
            on c.id = a.chatId
          WHERE a.usuarioId = ${usuario1} AND b.usuarioId = ${usuario2} AND c.flagGrupo = false       
          `
      );
      return chat;
    } catch (error) {
      throw new HttpException(
        error.response || "Erro ao buscar chat.",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async buscarChat(id: Number) {
    try {
      const chat = await this.chatRepository.findOne({
        where: { id: id }, // Usando um alias 'chat' para especificar a tabela
        relations: ["usuarios"],
      });
      if (!chat) {
        throw new NotFoundException("Chat não encontrado.");
      }
      return chat;
    } catch (error) {
      throw new HttpException(
        error.response || "Erro ao buscar chat.",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async listarMembros(id: Number) {
    return (await this.buscarChat(id)).usuarios;
  }

  async adicionarMembro(id: Number, telefone: string, administrador: string) {
    try {
      const chat = await this.buscarChat(id);

      if (!chat.flagGrupo) {
        throw new BadRequestException("O chat buscado não é um grupo");
      }

      if (!(chat.administrador === administrador))
        throw new UnauthorizedException("Você não é administrador do grupo");

      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);

      if (chat.usuarios.some((element) => element.id === usuario.id))
        throw new BadRequestException("O usuário já está no grupo");

      chat.usuarios.push(usuario);

      return await this.chatRepository.save(chat);
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao adicionar membro",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removerMembro(id: Number, telefone: string, administrador: string) {
    try {
      var chat = await this.buscarChat(id);

      if (!chat.flagGrupo) {
        throw new BadRequestException("O chat buscado não é um grupo.");
      }

      if (!(chat.administrador === administrador))
        throw new UnauthorizedException("Você não é administrador do grupo");

      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);

      chat.usuarios = chat.usuarios.filter(
        (element) => element.id !== usuario.id
      );

      return await this.chatRepository.save(chat);
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao remover membro do grupo",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async cadastrarGrupo(chat: GrupoDto) {
    try {
      const newChat = new Chat();
      const usuario: Usuario = await this.usuarioService.encontraPorTelefone(
        chat.administrador
      );

      newChat.flagGrupo = true;
      newChat.nome = chat.nome;
      newChat.usuarios = [usuario];
      newChat.administrador = chat.administrador;

      return await this.chatRepository.save(newChat);
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao cadastrar grupo",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async cadastrarConversaPrivada(chat: ConversaPrivadaDto) {
    try {
      var newChat = new Chat();

      const usuario1: Usuario = await this.usuarioService.encontraPorTelefone(
        chat.usuarioDe
      );

      const usuario2: Usuario = await this.usuarioService.encontraPorTelefone(
        chat.usuarioPara
      );

      const verificarChat = await this.verificarEmChatsPrivados(
        +usuario1.id,
        +usuario2.id
      );

      if (verificarChat.length > 0)
        throw new BadRequestException(
          "Já existe uma conversa privada cadastrada entre os dois usuários"
        );

      if (!usuario1 || !usuario2) return;

      newChat.usuarios = [usuario1, usuario2];

      return await this.chatRepository.save(newChat);
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao cadastrar conversa privada",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deletarChat(id: Number) {
    try {
      await this.executeQuery(`DELETE FROM message WHERE chatId = ${+id}`);
      await this.executeQuery(`DELETE FROM chat WHERE id = ${+id}`);
      return { message: `Chat de id ${id} deletada` };
    } catch (e) {
      console.error(e);
      throw new HttpException(
        e.response || "Erro ao deletar chat",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async bloquearNoChat(id: Number, telefone: string) {}
}
