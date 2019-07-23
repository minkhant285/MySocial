import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostsInput, PostsType } from './types/graphql-types';
import { PubSub } from 'graphql-subscriptions';
import { async } from 'rxjs/internal/scheduler/async';
const pubSub = new PubSub();

@Resolver('Posts')
export class PostsResolver {
    constructor(private readonly postsService: PostsService) { }

    ///////////////////Query///////////////////////

    @Query(() => [PostsType])
    async posts() {
        return this.postsService.findAll();
    }

    @Query(() => PostsType)
    async postDelete(@Args('post_id') pid: string) {
        return this.postsService.deletePost(pid);
    }

    @Query(() => PostsType)
    async findPost(@Args('post_id') pid: string) {
        return this.postsService.findOneByPID(pid);
    }

    @Query(() => [PostsType])
    async findPostUID(@Args('uid') uid: string) {
        return this.postsService.findOneByUID(uid);
    }

    ///////////////////Query///////////////////////

    ///////////////////Mutation///////////////////////

    @Mutation(() => PostsType)
    async postCreate(@Args('input') input: PostsInput) {
        const post = this.postsService.createPost(input);
        pubSub.publish('POST_CREATED', { newPosts: input });
        return post;
    }

    @Mutation(() => PostsType)
    async postLike(@Args('post_id') pid: string, @Args('likeUser') luser: string) {
        return this.postsService.likePost(pid, luser);
    }

    @Mutation(() => PostsType)
    async postUnLike(@Args('post_id') pid: string, @Args('unlikeUser') unLuser: string) {
        return this.postsService.unlikePost(pid, unLuser);
    }

    @Mutation(() => [PostsType])
    async postComment(@Args('post_id') pid: string, @Args('comment') commentData: string) {
        return this.postsService.commentPost(pid, commentData);
    }

    ///////////////////Mutation///////////////////////

    @Subscription(() => PostsType)
    async newPosts() {
        return pubSub.asyncIterator('POST_CREATED');
    }
}
