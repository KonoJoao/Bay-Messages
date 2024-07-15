import { Inject, Injectable } from '@nestjs/common';
import { UsuarioDto } from './usuario.dto';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
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
    return await this.usuarioRepository.findOne({ where: { telefone } });
}

  async listarTodos(): Promise<any> {
    return await this.usuarioRepository.find();
  }
}
