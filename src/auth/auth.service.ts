import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(telefone: string, senha: string): Promise<any> {
    const usuario = await this.usersService.encontraPorTelefone(telefone);

    if (usuario && usuario.senha === senha) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(usuario: Usuario) {
    const payload = { telefone: usuario.telefone, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
