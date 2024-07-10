export declare class Denuncia {
    id: Number;
    motivo: MotivosDenuncia;
    dataDenuncia: Date;
    listar: () => void;
}
declare enum MotivosDenuncia {
    CONTATO = "CONTATO INDESEJADO",
    IMORALIDADE = "IMORALIDADE",
    SPAM = "SPAM"
}
export {};
