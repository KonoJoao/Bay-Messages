import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatModule } from "./chat/chat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import {DatabaseModule} from "./database/database.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ChatModule, UsuarioModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
