import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { ChatModule } from "src/chat/chat.module";
import { MessageService } from "./message.service";
import { Message } from "./message.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModule } from "src/usuario/usuario.module";
import { ModeradorModule } from "src/moderador/moderador.module";

@Module({
  imports: [
    ChatModule,
    UsuarioModule,
    ModeradorModule,
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
