import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      //typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/ions-ms-chats', { useNewUrlParser: true }),
    ChatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
