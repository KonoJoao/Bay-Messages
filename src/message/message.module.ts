import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { ChatModule } from 'src/chat/chat.module';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ChatModule, TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
