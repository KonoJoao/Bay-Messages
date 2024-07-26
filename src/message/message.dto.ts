import { ChatDto } from "src/chat/chat.dto";

export class MessageDto {
  idMessage: Number;
  text: string;
  telefone: string;
  createdAt: Date | string;
  censurado: boolean;
  chat: ChatDto;

  constructor(message?: Partial<MessageDto>) {
    this.idMessage = message?.idMessage;
    this.text = message?.text;
    this.telefone = message?.telefone;
    this.createdAt = message?.createdAt;
    this.censurado = message?.censurado;
    this.chat = message?.chat;
  }
}
