import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; // Exemplo usando TypeORM
import { ConfigModule, ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { Usuario } from "src/usuario/usuario.entity";
import { Chat } from "src/chat/chat.entity";

config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Usuario, Chat],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
