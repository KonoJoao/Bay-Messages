import { Test, TestingModule } from "@nestjs/testing";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { ChatService } from "src/chat/chat.service";
import { Message } from "./message.entity";
import { MessageDto } from "./message.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";

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

describe("MessageController", () => {
  let messageController: MessageController;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            cadastrarMessage: jest.fn().mockResolvedValue(messages[0]),
            buscarMessage: jest.fn().mockResolvedValue(messages),
            editarMessage: jest.fn().mockResolvedValue(messages[0]),
            deletarMessage: jest
              .fn()
              .mockResolvedValue({ message: "Mensagem de id 1 deletada" }),
          },
        },
      ],
    }).compile();

    messageController = module.get<MessageController>(MessageController);
    messageService = module.get<MessageService>(MessageService);
  });

  it("should be defined", () => {
    expect(messageController).toBeDefined();
    expect(messageService).toBeDefined();
  });

  describe("cadastrarMessage", () => {
    it("Envio de mensagem dentro dos padrões de uso", async () => {
      //arrange
      //act
      const result = await messageController.cadastrarMessage(messages[0], 2);
      //assert
      expect(result).toEqual(messages[0]);
    });
    it("Envio de mensagem sem estar no chat", () => {
      const body = new MessageDto({
        text: "teste",
        telefone: "+5562985",
      });
      //arrange
      jest
        .spyOn(messageService, "cadastrarMessage")
        .mockRejectedValueOnce(
          new UnauthorizedException("O usuário não está nesse chat!")
        );
      //assert
      expect(messageController.cadastrarMessage(body, 2)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });

  describe("buscarMessage", () => {
    it("Visualizar mensagens enviadas fornecendo válida identificação do chat", async () => {
      const result = await messageController.buscarMessage(
        2,
        messages[0].telefone
      );
      expect(result).toEqual(messages);
    });
    it("Visualizar mensagens enviadas sem estar no chat", () => {
      //arrange
      jest
        .spyOn(messageService, "buscarMessage")
        .mockRejectedValueOnce(
          new UnauthorizedException("O usuário não está nesse chat!")
        );
      //assert
      expect(
        messageController.buscarMessage(2, "+5562985304972")
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("editarMessage", () => {
    it("Editar mensagem fornecendo identificação valida da mensagem", async () => {
      const result = await messageController.editarMessage(
        1,
        "+5562985304972",
        "teste"
      );
      expect(result).toEqual(messages[0]);
      expect(messageService.editarMessage).toHaveBeenCalledTimes(1);
    });
    it("Editar mensagem fornecendo identificação inválida da mensagem", () => {
      //arrange
      jest
        .spyOn(messageService, "editarMessage")
        .mockRejectedValueOnce(
          new BadRequestException("Mensagem não encontrada!")
        );
      //assert
      expect(
        messageController.editarMessage(1, "+5562985304972", "teste")
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("deletarMessage", () => {
    it("Deletar mensagem fornecendo identificação valida da mensagem", async () => {
      const result = await messageController.deletarMessage(
        1,
        "+5562985304972"
      );
      expect(result).toEqual({ message: `Mensagem de id 1 deletada` });
      expect(messageService.deletarMessage).toHaveBeenCalledTimes(1);
    });
    it("Deletar mensagem fornecendo identificação inválida da mensagem", async () => {
      //arrange
      jest
        .spyOn(messageService, "deletarMessage")
        .mockRejectedValueOnce(
          new BadRequestException("Mensagem não encontrada!")
        );
      //assert
      expect(
        messageController.deletarMessage(1, "+5562985304972")
      ).rejects.toThrow(BadRequestException);
    });
  });
});
