import { Module } from "@nestjs/common";
import { ModeradorService } from "./moderador.service";
import { ChatModule } from "src/chat/chat.module";
import { ModeradorController } from "./moderador.controller";
import { UsuarioModule } from "src/usuario/usuario.module";
@Module({
  imports: [ChatModule, UsuarioModule],
  providers: [ModeradorService],
  controllers: [ModeradorController],
  exports: [ModeradorService],
})
export class ModeradorModule {}
