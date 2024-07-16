import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./chat.entity";
import { Repository } from "typeorm";
import { ChatDto } from "./chat.dto";
import { GrupoDto } from "./grupo.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import { Usuario } from "src/usuario/usuario.entity";

@Injectable()
export class ChatService {
  constructor(
    @Inject()
    private readonly usuarioService: UsuarioService,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>
  ) {}

  async cadastrarGrupo(chat: GrupoDto) {
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
  }
}
