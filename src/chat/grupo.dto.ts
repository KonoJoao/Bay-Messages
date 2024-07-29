import { UsuarioDto } from "src/usuario/usuario.dto";
import { ChatDto } from "./chat.dto";

export class GrupoDto extends ChatDto {
  nome: string;
  flagGrupo: boolean;
  administrador: string;
  usuarios: UsuarioDto[];

  constructor(grupoDto?: Partial<GrupoDto>) {
    super();
    this.nome = grupoDto?.nome;
    this.flagGrupo = grupoDto?.flagGrupo;
    this.administrador = grupoDto?.administrador;
    this.usuarios = grupoDto?.usuarios;
  }
}
