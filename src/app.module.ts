import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatModule } from "./chat/chat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import {DatabaseModule} from "./database/database.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { AuthModule } from "./auth/auth.module";
import { ModeradorService } from './moderador/moderador.service';
import { MessageModule } from './message/message.module';

@Module({
  imports: [ChatModule, UsuarioModule, DatabaseModule, AuthModule, MessageModule],
  controllers: [AppController],
  providers: [AppService, ModeradorService],
})
export class AppModule {}
