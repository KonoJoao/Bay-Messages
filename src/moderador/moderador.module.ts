import { Module } from '@nestjs/common';
import { ModeradorService } from './moderador.service';
import { ChatModule } from 'src/chat/chat.module';
import { ModeradorController } from './moderador.controller';
@Module({
    imports:[ChatModule],
    providers: [ModeradorService],
    controllers: [ModeradorController],
      
})
export class ModeradorModule {}
