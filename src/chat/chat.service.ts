import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./chat.entity";
import { Repository } from "typeorm";
import { ChatDto } from "./chat.dto";
import { GrupoDto } from "./grupo.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import { Usuario } from "src/usuario/usuario.entity";
import { ConversaPrivadaDto } from "./conversaPrivada.dto";

@Injectable()
export class ChatService {
  constructor(
    @Inject()
    private readonly usuarioService: UsuarioService,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>
  ) {}

  private async buscarChat(id: Number) {
    try {
      const grupo = await this.chatRepository.findOne({
        where: { id: id },
        relations: ["usuarios"],
      });
      if (!grupo) {
        throw new NotFoundException("Chat não encontrado.");
      }
      if (!grupo.flagGrupo) {
        throw new BadRequestException("O chat buscado não é um grupo.");
      }
      return grupo;
    } catch (error) {
      throw new HttpException(
        error.response || "Erro ao listar membros do grupo.",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async listarMembros(id: Number) {
    return (await this.buscarChat(id)).usuarios;
  }

  async adicionarMembro(id: Number, telefone: string) {
    try {
      const chat = await this.buscarChat(id);
      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);

      chat.usuarios.push(usuario);

      return await this.chatRepository.save(chat);
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao adicionar membro",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removerMembro(id: Number, telefone: string) {
    try {
      var chat = await this.buscarChat(id);
      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);

      chat.usuarios = chat.usuarios.filter((element) => element !== usuario);

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
}
