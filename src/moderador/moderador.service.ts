import { Inject, Injectable } from "@nestjs/common";
import ArrayPalavrasCensuradas from "./palavrasCensuradas";
import { ChatService } from "src/chat/chat.service";

enum MotivosDenuncia {
  CONTATO = "CONTATO INDESEJADO",
  IMORALIDADE = "IMORALIDADE",
  SPAM = "SPAM",
}

interface ReturnSchema {
  status: boolean;
  banimento: {
    data?: Date;
  };
  message: string;
}
@Injectable()
export class ModeradorService {
  constructor(
    @Inject()
    private readonly chatService: ChatService
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

  async verificarMensagem(
    mensagem: string,
    motivo: string,
    dataDenuncia: Date,
    chatId: number
  ): Promise<ReturnSchema> {
    const mensagemFormated = this.removerCaracteresEspeciais(mensagem);
    const dataBanimento = dataDenuncia;
    switch (motivo) {
      case "CONTATO INDESEJADO":
        dataBanimento.setFullYear(dataDenuncia.getFullYear() + 1);
        return {
          status: true,
          banimento: {
            data: dataBanimento,
          },
          message: "banimento realizado com sucesso!",
        };

      case "IMORALIDADE":
        const result = ArrayPalavrasCensuradas.find((item) =>
          mensagemFormated.split(" ").some((parte) => parte == item.termo)
        );
        console.log(result);
        if (!result) {
          return {
            status: false,
            banimento: {
              data: dataBanimento,
            },
            message: "Nenhuma inconformidade encontrada!",
          };
        } else if (result.grau > 2) {
          dataBanimento.setHours(dataBanimento.getHours() + 1);
          return {
            status: true,
            banimento: {
              data: dataBanimento,
            },
            message: "Usuário banido por uma (1) hora!",
          };
        } else {
          return {
            status: false,
            banimento: {
              data: dataBanimento,
            },
            message: `${result.termo[0]}${"*".repeat(result.termo.length - 1)}`,
          };
        }

      case "SPAM":
        const messages = await this.chatService.executeQuery(
          `SELECT * FROM message` // WHERE createdAt >= NOW() - INTERVAL 1 HOUR
        );
        console.log(messages);
        // if(messages.map((mensagem)=>))
        return messages;
    }
  }
}
