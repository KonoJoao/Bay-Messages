export class UsuarioDto {
  id: number;
  telefone: string;
  nome: string;
  senha: string;
  banidoAte: Date;

  enviarMensagem = () => {}; //ainda não foi feito
  realizarDenuncia = () => {}; //ainda não foi feito
  logar = () => {}; //feito - está em auth
  validarToken = () => {}; //está no método de login
  gerarToken = () => {}; //está no método de login
  cadastrar = () => {}; //feito
}
