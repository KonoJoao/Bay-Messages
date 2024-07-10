export declare class Usuario {
    id: Number;
    telefone: Number;
    nome: string;
    senha: string;
    banidoAte: Date;
    enviarMensagem: () => void;
    realizarDenuncia: () => void;
    logar: () => void;
    validarToken: () => void;
    gerarToken: () => void;
}
