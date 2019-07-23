import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './interfaces/posts.schema';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema }])],
  controllers: [PostsController],
  providers: [PostsService, PostsResolver],
})
export class PostsModule { }
