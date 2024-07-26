import { UsuarioDto } from "src/usuario/usuario.dto";
import { ChatDto } from "./chat.dto";

export class GrupoDto extends ChatDto {
  nome: string;
  administrador: string;
  usuarios: UsuarioDto[];
}
