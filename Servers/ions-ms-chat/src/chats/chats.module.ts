import { Module } from '@nestjs/common';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsSchema } from './chats.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Chat', schema: ChatsSchema},{name:'ChatHistory', schema: ChatsSchema}])],
  providers: [ChatsResolver,
  ChatsService],
  })
export class ChatsModule {}
