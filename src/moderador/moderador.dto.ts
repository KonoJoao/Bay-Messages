export class BanimentoDto {
  mensagem: string;
  motivo: string;
  dataDenuncia: Date;
  chatId: number;
  telefone: string;
}

export class DesbanimentoDto {
  chatId: number;
  telefone: string;
}
