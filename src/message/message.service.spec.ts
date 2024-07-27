import { Test, TestingModule } from "@nestjs/testing";
import { MessageService } from "./message.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { MessageDto } from "./message.dto";
import { UsuarioService } from "../usuario/usuario.service";
import { ChatService } from "../chat/chat.service";
import { Usuario } from "../usuario/usuario.entity";
import { Chat } from "../chat/chat.entity";
import { Repository } from "typeorm";

import {
  BadRequestException,
  HttpException,
  UnauthorizedException,
} from "@nestjs/common";

const messages = [
  new MessageDto({
    idMessage: 1,
    text: "teste",
    telefone: "+5562985304972",
    createdAt: new Date(),
    censurado: false,
    chat: {
      id: 2,
    },
  }),
  new MessageDto({
    idMessage: 2,
    text: "teste2",
    telefone: "+5562985304972",
    createdAt: new Date(),
    censurado: false,
    chat: {
      id: 2,
    },
  }),
  new MessageDto({
    idMessage: 3,
    text: "teste3",
    telefone: "+5562985304972",
    createdAt: new Date(),
    censurado: false,
    chat: {
      id: 2,
    },
  }),
];

const acessoValidoTeste = {
  flagGrupo: true,
  nome: "testexb",
  administrador: "62985308972",
  id: 2,
  usuarios: [
    {
      id: 6,
      nome: "testet",
      telefone: "+5562985304972",
      senha: "asdwqdw",
      banidoAte: null,
      codigoVerificacao: "353360",
    },
  ],
};

describe("MessageService", () => {
  let messageService: MessageService;
  let messageRepository: Repository<Message>;
  let usuarioService: UsuarioService;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: UsuarioService,
          useValue: {
            encontraPorTelefone: jest.fn().mockResolvedValue({
              id: 6,
              nome: "testet",
              telefone: "+5562985304972",
              senha: "asdwqdw",
              banidoAte: null,
              codigoVerificacao: "353360",
            }),
          },
        },
        {
          provide: ChatService,
          useValue: {
            buscarChat: jest.fn().mockResolvedValue({
              flagGrupo: false,
              nome: "",
              administrador: "",
              id: 12,
              usuarios: [
                {
                  id: 6,
                  nome: "testet",
                  telefone: "+5562985304972",
                  senha: "asdwqdw",
                  banidoAte: null,
                  codigoVerificacao: "353360",
                },
                {
                  id: 7,
                  nome: "deftonerson",
                  telefone: "+5562994459111",
                  senha: "teste",
                  banidoAte: null,
                  codigoVerificacao: "666666",
                },
              ],
            }),
          },
        },
        {
          provide: getRepositoryToken(Message),
          useValue: {
            // validarAcesso: jest.fn().mockResolvedValue(acessoValidoTeste),
            save: jest.fn().mockResolvedValue(messages[0]),
            find: jest.fn().mockResolvedValue(messages),
            findOne: jest.fn().mockResolvedValue(messages[0]),
            // editarMessage: jest.fn(),
            delete: jest.fn().mockResolvedValue(""),
          },
        },
        // {
        //   provide: getRepositoryToken(Usuario),
        //   useValue: {
        //     encontraPorTelefone: jest.fn(),
        //   },
        // },
        // {
        //   provide: getRepositoryToken(Chat),
        //   useValue: {
        //     buscarChat: jest.fn(),
        //   },
        // },
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    chatService = module.get<ChatService>(ChatService);
    messageRepository = module.get(getRepositoryToken(Message));
  });

  it("should be defined", () => {
    expect(messageService).toBeDefined();
    expect(usuarioService).toBeDefined();
    expect(chatService).toBeDefined();
  });

  describe("cadastrarMessage", () => {
    it("Envio de mensagem dentro dos padrões de uso", async () => {
      //arrange
      //act
      const result = await messageService.cadastrarMessage(messages[0], 2);
      //assert
      expect(result).toEqual(messages[0]);
    });
    it("Envio de mensagem sem estar no chat", () => {
      const body = new MessageDto({
        text: "teste",
        telefone: "+5562985304972",
      });
      //arrange
      jest
        .spyOn(messageService, "validarAcesso")
        .mockRejectedValueOnce(
          new UnauthorizedException("O usuário não está nesse chat!")
        );
      //assert
      expect(messageService.cadastrarMessage(body, 12)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe("buscarMessage", () => {
    it("Visualizar mensagens enviadas fornecendo válida identificação do chat", async () => {
      const result = await messageService.buscarMessage(
        2,
        messages[0].telefone
      );
      expect(result).toEqual(messages);
    });
    it("Visualizar mensagens enviadas sem estar no chat", () => {
      //arrange
      jest
        .spyOn(messageService, "validarAcesso")
        .mockRejectedValueOnce(
          new UnauthorizedException("O usuário não está nesse chat!")
        );
      //assert
      expect(messageService.buscarMessage(2, "+5562985304972")).rejects.toThrow(
        HttpException
      );
    });
  });

  describe("editarMessage", () => {
    it("Editar mensagem fornecendo identificação valida da mensagem", async () => {
      const result = await messageService.editarMessage(
        1,
        "+5562985304972",
        "teste"
      );
      expect(result).toEqual({ result: messages[0] });
      // expect(messageService.editarMessage).toHaveBeenCalledTimes(1);
    });
    it("Editar mensagem fornecendo identificação inválida da mensagem", async () => {
      //arrange
      jest.spyOn(messageRepository, "findOne").mockRejectedValueOnce(null);
      //assert
      expect(
        messageService.editarMessage(3, "+5562985304972", "teste")
      ).rejects.toThrow(HttpException);
    });
  });

  describe("deletarMessage", () => {
    it("Deletar mensagem fornecendo identificação valida da mensagem", async () => {
      const result = await messageService.deletarMessage(1, "+5562985304972");
      expect(result).toEqual({ message: `Mensagem de id 1 deletada` });
      // expect(messageService.deletarMessage).toHaveBeenCalledTimes(1);
    });
    it("Deletar mensagem fornecendo identificação inválida da mensagem", async () => {
      //arrange
      jest.spyOn(messageRepository, "findOne").mockRejectedValueOnce(null);

      //assert
      expect(
        messageService.deletarMessage(1, "+5562985304972")
      ).rejects.toThrow(HttpException);
    });
  });
});
