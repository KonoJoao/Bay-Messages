import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('cadastrar')
  cadastrar(@Body() usuarioDto: UsuarioDto): Promise<any> {
    return this.usuarioService.cadastrar(usuarioDto);
  }

  @Get('encontraPorTelefone')
  encontraPorTelefone(@Body() telefone: string): Promise<any> {
    return this.usuarioService.encontraPorTelefone(telefone);
  }

  @Get('listarTodos')
  @UseGuards(JwtAuthGuard)
  listarTodos(): Promise<any> {
    return this.usuarioService.listarTodos();
  }
}
