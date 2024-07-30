import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());

  const configSwagger = new DocumentBuilder()
    .setTitle("Api BayMessages")
    .setDescription("Documentação da API de mensagens")
    .setVersion("1.0")
    .build();

  SwaggerModule.createDocument(app, configSwagger, {
    include: [AppModule],
  });
  await app.listen(3000);
}
bootstrap();
