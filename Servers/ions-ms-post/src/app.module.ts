import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/ions-ms-posts', {
      useNewUrlParser: true,
    }),
    PostsModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService],
})
export class AppModule { }
