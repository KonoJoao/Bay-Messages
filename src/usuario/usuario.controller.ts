import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "./usuario.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("usuario")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post("cadastrar")
  cadastrar(@Body() usuarioDto: UsuarioDto): Promise<any> {
    return this.usuarioService.cadastrar(usuarioDto);
  }

  @Patch("atualizar")
  @UseGuards(JwtAuthGuard)
  atualizar(@Body() usuarioDto: UsuarioDto): Promise<any> {
    return this.usuarioService.atualizar(usuarioDto);
  }

  @Get("encontraPorTelefone")
  encontraPorTelefone(@Body("telefone") telefone: string): Promise<any> {
    return this.usuarioService.encontraPorTelefone(telefone);
  }

  @Post("enviarCodigoVerificacao")
  enviarCodigoVerificacao(@Body("telefone") telefone: string): Promise<any> {
    return this.usuarioService.enviarCodigoVerificacao(telefone);
  }

  @Get("listarTodos")
  @UseGuards(JwtAuthGuard)
  listarTodos(): Promise<any> {
    return this.usuarioService.listarTodos();
  }

  @Get("encontraPorId")
  @UseGuards(JwtAuthGuard)
  encontraPorId(@Body("id") id: number): Promise<any> {
    return this.usuarioService.encontraPorId(id);
  }

  @Delete("deletar")
  @UseGuards(JwtAuthGuard)
  deletar(@Body("id") id: number): Promise<any> {
    return this.usuarioService.deletar(id);
  }
}
