import { Usuario } from "src/usuario/usuario.entity";
import { ChatDto } from "./chat.dto";

export class ConversaPrivadaDto extends ChatDto {
  usuarioDe: string;
  usuarioPara: string;
}
