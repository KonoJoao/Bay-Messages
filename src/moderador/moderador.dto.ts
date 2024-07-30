export class BanimentoDto {
  mensagem: string;
  motivo: string;
  chatId: number;
  telefone: string;
}

export class DesbanimentoDto {
  chatId: number;
  telefone: string;
}
