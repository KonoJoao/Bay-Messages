import { Inject, Injectable } from "@nestjs/common";
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
    return await this.chatRepository.findOne({
      where: { id: id },
      relations: ["usuarios"],
    });
  }

  async adicionarMembro(id: Number, telefone: string) {
    try {
      const chat = await this.buscarChat(id);
      console.log(chat);
      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);

      if (!usuario || !chat) return;

      chat.usuarios.push(usuario);

      return await this.chatRepository.save(chat);
    } catch (e) {
      console.error(e);
    }
  }

  async removerMembro(id: Number, telefone: string) {
    try {
      var chat = await this.buscarChat(id);
      const usuario: Usuario =
        await this.usuarioService.encontraPorTelefone(telefone);

      if (!usuario || !chat) return;

      chat.usuarios = chat.usuarios.filter((element) => element !== usuario);

      return await this.chatRepository.save(chat);
    } catch (e) {
      console.error(e);
    }
  }

  async cadastrarGrupo(chat: GrupoDto) {
    try {
      const newChat = new Chat();
      const usuario: Usuario = await this.usuarioService.encontraPorTelefone(
        chat.administrador
      );
      if (!usuario) return;

      newChat.flagGrupo = true;
      newChat.nome = chat.nome;
      newChat.usuarios = [usuario];
      newChat.administrador = chat.administrador;

      return await this.chatRepository.save(newChat);
    } catch (e) {
      console.error(e);
    }
  }

  async cadastrarConversaPrivada(chat: ConversaPrivadaDto) {
    try {
      const newChat = new Chat();
      const usuario1: Usuario = await this.usuarioService.encontraPorTelefone(
        chat.usuarioDe
      );

      const usuario2: Usuario = await this.usuarioService.encontraPorTelefone(
        chat.usuarioPara
      );

      if (!usuario1 || !usuario2) return;

      newChat.usuarios.push(usuario1, usuario2);

      return await this.chatRepository.save(newChat);
    } catch (e) {
      console.error(e);
    }
  }
}
