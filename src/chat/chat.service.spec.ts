import { Test, TestingModule } from "@nestjs/testing";
import { ChatService } from "./chat.service";
import { UsuarioService } from "../usuario/usuario.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./chat.entity";
import { GrupoDto } from "./grupo.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

const grupoCriado = {
  flagGrupo: true,
  nome: "grupo teste",
  administrador: "+5562985304972",
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
  id: 13,
};

const chatBuscado = {
  flagGrupo: true,
  nome: "teste",
  administrador: "+5562985304972",
  id: 13,
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
};

describe("ChatService", () => {
  let chatService: ChatService;
  let chatRepository: Repository<Chat>;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: UsuarioService,
          useValue: {
            encontraPorTelefone: jest.fn().mockResolvedValue({
              id: 8,
              nome: "teste",
              telefone: "+5562994459113",
              senha: "teste",
              banidoAte: null,
              codigoVerificacao: "666667",
            }),
          },
        },
        {
          provide: getRepositoryToken(Chat),
          useValue: {
            findOne: jest.fn().mockResolvedValue(chatBuscado),
            save: jest.fn().mockResolvedValue(grupoCriado),
          },
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    chatRepository = module.get(getRepositoryToken(Chat));
  });

  it("should be defined", () => {
    expect(chatService).toBeDefined();
    expect(usuarioService).toBeDefined();
    expect(chatRepository).toBeDefined();
  });

  describe("cadastrarGrupo", () => {
    it("Criar grupo", async () => {
      // jest.spyOn(chatRepository, "save").mockResolvedValue(chatBuscado);
      const body = new GrupoDto({
        nome: "grupo teste",
        administrador: "+5562985304972",
      });
      const result = await chatService.cadastrarGrupo(body);

      expect(result).toEqual(grupoCriado);
    });
  });

  describe("adicionarMembro", () => {
    it("Adicionar membro com número de telefone válido", async () => {
      const expected = {
        flagGrupo: true,
        nome: "teste",
        administrador: "+5562985304972",
        id: 13,
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
          {
            id: 8,
            nome: "teste",
            telefone: "+5562994459113",
            senha: "teste",
            banidoAte: null,
            codigoVerificacao: "666667",
          },
        ],
      };

      jest.spyOn(chatRepository, "save").mockResolvedValueOnce(expected);

      const result = await chatService.adicionarMembro(
        13,
        "+5562994459111",
        "+5562985304972"
      );

      expect(result).toEqual(expected);
    });

    it("Adicionar membro com número de telefone inválido", () => {
      jest.spyOn(chatRepository, "save").mockResolvedValueOnce(chatBuscado);
      jest
        .spyOn(usuarioService, "encontraPorTelefone")
        .mockRejectedValueOnce(
          new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND)
        );

      expect(
        chatService.adicionarMembro(13, "+556299445911", "+5562985304972")
      ).rejects.toThrow(HttpException);
    });

    it("Adicionar membro sem ser administrador", () => {
      expect(
        chatService.adicionarMembro(13, "+5562994459111", "+5562985304971")
      ).rejects.toThrow(HttpException);
    });
  });
  describe("removerMembro", () => {
    it("Remover membro com número de telefone válido", async () => {
      const expected = {
        flagGrupo: true,
        nome: "teste",
        administrador: "+5562985304972",
        id: 13,
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

      jest.spyOn(chatRepository, "save").mockResolvedValueOnce(expected);

      const result = await chatService.removerMembro(
        13,
        "+5562994459111",
        "+5562985304972"
      );

      console.log(result);

      expect(result).toEqual(expected);
    });

    it("Remover membro com número de telefone inválido", () => {
      // jest.spyOn(chatRepository, "save").mockResolvedValueOnce(chatBuscado);
      jest
        .spyOn(usuarioService, "encontraPorTelefone")
        .mockRejectedValueOnce(
          new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND)
        );

      expect(
        chatService.removerMembro(13, "+556299445911", "+5562985304972")
      ).rejects.toThrow(HttpException);
    });
    it("Remover membro sem ser administrador", () => {
      expect(
        chatService.removerMembro(13, "+5562994459111", "+5562985304971")
      ).rejects.toThrow(HttpException);
    });
  });
});
