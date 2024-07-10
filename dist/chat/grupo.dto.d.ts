import { Usuario } from "src/usuario/usuario.dto";
import { Chat } from "./chat.dto";
export declare class Grupo extends Chat {
    nome: string;
    administrador: Usuario;
    adicionarUsuario: () => void;
    removerUsuario: () => void;
}
