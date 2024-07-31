export class BanimentoDto {
  userId: number;
  mensagem: string;
  motivo: string;
  chatId: number;
  telefone?: string;
}

export class DesbanimentoDto {
  chatId: number;
  telefone: string;
}
