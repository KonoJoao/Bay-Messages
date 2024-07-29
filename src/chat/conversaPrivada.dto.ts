import { Usuario } from "src/usuario/usuario.entity";
import { ChatDto } from "./chat.dto";

export class ConversaPrivadaDto extends ChatDto {
  usuarioDe: string;
  usuarioPara: string;

  constructor(conversaPrivadaDto?: Partial<ConversaPrivadaDto>) {
    super();
    this.usuarioDe = conversaPrivadaDto?.usuarioDe;
    this.usuarioPara = conversaPrivadaDto?.usuarioPara;
  }
}
