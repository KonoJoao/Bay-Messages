export class Denuncia {
  id: Number;
  motivo: MotivosDenuncia;
  dataDenuncia: Date;

  listar = () => {};
}

enum MotivosDenuncia {
  CONTATO = "CONTATO INDESEJADO",
  IMORALIDADE = "IMORALIDADE",
  SPAM = "SPAM",
}
