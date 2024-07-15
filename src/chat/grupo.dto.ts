import { UsuarioDto } from "src/usuario/usuario.dto";
import { Chat } from "./chat.dto";

export class Grupo extends Chat {
  nome: string;
  administrador: UsuarioDto;

  adicionarUsuario = () => {};

  removerUsuario = () => {};
}
