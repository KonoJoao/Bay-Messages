import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioDto } from "./usuario.dto";
import { Usuario } from "./usuario.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as twilio from "twilio";
import { config } from "dotenv";

config();

@Injectable()
export class UsuarioService {
  private readonly client: twilio.Twilio;

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    this.client = twilio(accountSid, authToken);
  }

  async enviarCodigoVerificacao(telefone: string): Promise<any> {
    try {
      await this.client.verify.v2
        .services(process.env.VERIFY_SID)
        .verifications.create({ to: "+5562985304972", channel: "sms" });
      return { message: "sms enviado" };
    } catch (error) {
      throw new HttpException(
        "Erro ao enviar código de verificação",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verificarCodigo(telefone: string, codigo: string): Promise<boolean> {
    try {
      const verificationCheck = await this.client.verify.v2
        .services(process.env.VERIFY_SID)
        .verificationChecks.create({ to: "+5562985304972", code: codigo });

      return verificationCheck.status === "approved";
    } catch (error) {
      throw new HttpException(
        "Erro ao verificar código",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async cadastrar(usuarioDto: UsuarioDto): Promise<any> {
    const telefoneRegex = /^\+55\d{11}$/;
    if (!telefoneRegex.test(usuarioDto.telefone)) {
      throw new HttpException(
        "Número de telefone inválido. O formato correto é +[código do país][número], por exemplo, +5511999999999",
        HttpStatus.BAD_REQUEST
      );
    }

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { telefone: usuarioDto.telefone },
    });
    if (usuarioExistente) {
      throw new HttpException("Telefone já cadastrado", HttpStatus.BAD_REQUEST);
    }

    const isVerified = await this.verificarCodigo(
      usuarioDto.telefone,
      usuarioDto.codigoVerificacao
    );
    if (!isVerified) {
      throw new HttpException(
        "Código de verificação inválido",
        HttpStatus.BAD_REQUEST
      );
    }

    const usuario = new Usuario();
    usuario.telefone = usuarioDto.telefone;
    usuario.nome = usuarioDto.nome;
    usuario.senha = usuarioDto.senha;
    usuario.banidoAte = usuarioDto.banidoAte;
    usuario.codigoVerificacao = usuarioDto.codigoVerificacao;

    const usuarioSalvo = await this.usuarioRepository.save(usuario);
    return usuarioSalvo;
  }

  async banirUsuario(telefone: string, bataBanimento: Date) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { telefone },
      });
      if (!usuario)
        throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
      return this.usuarioRepository.update(usuario.id, {
        banidoAte: bataBanimento,
      });
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao banir usuário",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async atualizar(usuarioDto: UsuarioDto): Promise<any> {
    try {
      const usuarioExistente = await this.usuarioRepository.findOne({ where: { id: usuarioDto.id } });
  
      if (!usuarioExistente) {
        throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
      }
  
      // Check if the telefone is being updated
      if (usuarioDto.telefone && usuarioExistente.telefone !== usuarioDto.telefone) {
        const telefoneExistente = await this.usuarioRepository.findOne({ where: { telefone: usuarioDto.telefone } });
        if (telefoneExistente) {
          throw new HttpException("Telefone já cadastrado", HttpStatus.BAD_REQUEST);
        }
  
        // Verify the new telefone
        const isVerified = await this.verificarCodigo(usuarioDto.telefone, usuarioDto.codigoVerificacao);
        if (!isVerified) {
          throw new HttpException("Código de verificação inválido", HttpStatus.BAD_REQUEST);
        }
  
        // Update telefone
        usuarioExistente.telefone = usuarioDto.telefone;
      }
  
      // Update other fields except id and telefone
      if (usuarioDto.nome) {
        usuarioExistente.nome = usuarioDto.nome;
      }
      if (usuarioDto.senha) {
        usuarioExistente.senha = usuarioDto.senha;
      }
      if (usuarioDto.banidoAte) {
        usuarioExistente.banidoAte = usuarioDto.banidoAte;
      }
  
      const usuarioAtualizado = await this.usuarioRepository.save(usuarioExistente);
      return usuarioAtualizado;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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


  async deletar(id: number): Promise<any> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
      });
      if (!usuario)
        throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
      await this.usuarioRepository.delete(id);
      return usuario;
    } catch (e) {
      throw new HttpException(
        e.response || "Erro ao deletar usuário",
        e.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
