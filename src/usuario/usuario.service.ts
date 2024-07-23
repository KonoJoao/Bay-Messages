import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsuarioDto } from "./usuario.dto";
import { Usuario } from "./usuario.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async cadastrar(usuarioDto: UsuarioDto): Promise<any> {
    const usuario = new Usuario();
    usuario.telefone = usuarioDto.telefone;
    usuario.nome = usuarioDto.nome;
    usuario.senha = usuarioDto.senha;
    usuario.banidoAte = usuarioDto.banidoAte;

    const usuarioSalvo = await this.usuarioRepository.save(usuario);
    return usuarioSalvo;
  }

  async encontraPorTelefone(telefone: string): Promise<any> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { telefone },
      });
      if (!usuario)
        throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
      return usuario;
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao buscar usuário",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async listarTodos(): Promise<any> {
    return await this.usuarioRepository.find();
  }
}
