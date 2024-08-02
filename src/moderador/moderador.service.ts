import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ArrayPalavrasCensuradas from "./palavrasCensuradas";
import { ChatService } from "../chat/chat.service";
import { Message } from "../message/message.entity";
import { UsuarioService } from "../usuario/usuario.service";
import { UsuarioDto } from "../usuario/usuario.dto";
import { DesbanimentoDto } from "./moderador.dto";

enum MotivosDenuncia {
  CONTATO = "CONTATO INDESEJADO",
  IMORALIDADE = "IMORALIDADE",
  SPAM = "SPAM",
}

export interface ReturnSchema {
  status: boolean;
  banimento: {
    data?: Date;
    message?: string;
  };
  message?: string;
  originalMessage?: string;
}
@Injectable()
export class ModeradorService {
  constructor(
    @Inject()
    private readonly chatService: ChatService,
    private readonly usuarioService: UsuarioService
  ) {}

  removerCaracteresEspeciais(texto: string) {
    texto = texto.replace(/[^\w\s]/gi, "");
    texto = texto.replace(/[áàãâä]/gi, "a");
    texto = texto.replace(/[éèêë]/gi, "e");
    texto = texto.replace(/[íìîï]/gi, "i");
    texto = texto.replace(/[óòõôö]/gi, "o");
    texto = texto.replace(/[úùûü]/gi, "u");
    texto = texto.replace(/[ç]/gi, "c");

    return texto;
  }

  async desbanirUsuario(params: DesbanimentoDto) {
    try {
      const { chatId, telefone } = params;
      return await this.chatService.desbloquearNoChat(chatId, telefone);
      //passar número e remover da lista de bloqueados
    } catch (error) {
      throw new HttpException(
        error.response || "Erro ao desbanir usuário",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verificarMensagem(
    mensagem: string,
    motivo: string,
    dataDenuncia: Date,
    chatId: number,
    telefone?: string
  ): Promise<ReturnSchema> {
    const mensagemFormated = this.removerCaracteresEspeciais(mensagem);
    const dataBanimento = dataDenuncia;
    switch (motivo) {
      case "CONTATO INDESEJADO":
        await this.chatService.bloquearNoChat(chatId, telefone);
        return {
          status: true,
          banimento: {
            data: dataBanimento,
            message: "contato bloqueado no chat com sucesso!",
          },
        };

      case "IMORALIDADE":
        const result = ArrayPalavrasCensuradas.find((item) =>
          mensagemFormated.split(" ").some((parte) => parte == item.termo)
        );
        if (!result) {
          return {
            status: false,
            banimento: {
              data: dataBanimento,
              message: "Nenhuma inconformidade encontrada!",
            },
          };
        } else if (result.grau > 2) {
          dataBanimento.setHours(dataBanimento.getHours() + 1);
          ///falta cadastrar número ao chat em que foi banido
          await this.usuarioService.banirUsuario(telefone, dataBanimento);
          return {
            status: true,
            banimento: {
              data: dataBanimento,
              message: "Usuário banido por uma (1) hora!",
            },
          };
        } else {
          return {
            status: false,
            banimento: {
              data: dataBanimento,
            },
            message: `${result.termo[0]}${"*".repeat(result.termo.length - 1)}`,
            originalMessage: result.termo,
          };
        }

      case "SPAM":
        const messages = await this.chatService.executeQuery(
          `
          SELECT *
          FROM message
          WHERE 
            chatId = ${chatId} AND
            createdAt >= NOW() - INTERVAL 10 HOUR
          `
        );
        if (
          messages.map((mensagem: Message) => mensagem.text == mensagemFormated)
            .length > 10
        ) {
          dataBanimento.setHours(dataBanimento.getHours() + 1);
          await this.usuarioService.banirUsuario(telefone, dataBanimento);
          return {
            status: true,
            banimento: {
              data: dataBanimento,
              message: "Usuário banido por uma (1) hora!",
            },
          };
        }
        return {
          status: false,
          banimento: {
            data: dataBanimento,
            message: "Nenhuma inconformidade encontrada!",
          },
        };
    }
  }
}
