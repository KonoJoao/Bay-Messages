import { Module } from '@nestjs/common';
import { ModeradorService } from './moderador.service';
import { ChatModule } from 'src/chat/chat.module';
@Module({
    imports:[ChatModule],
    providers: [ModeradorService],
      
})
export class ModeradorModule {}
