import { UsuarioDto } from "src/usuario/usuario.dto";

export abstract class ChatDto {
  id: Number = null;

  adicionarMensagem = () => {};

  listarMensagens = () => {};
}
