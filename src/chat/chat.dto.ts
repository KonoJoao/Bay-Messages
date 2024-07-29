import { MessageDto } from "src/message/message.dto";
import { UsuarioDto } from "src/usuario/usuario.dto";

export abstract class ChatDto {
  id: Number;
  message?: MessageDto[];

  constructor(chatDto?: Partial<ChatDto>) {
    this.id = chatDto?.id;
    this.message = chatDto?.message;
  }
}
