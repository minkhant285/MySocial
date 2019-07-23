import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { ChatsInput } from './inputs/chats.input';
import { ChatType } from './dto/create-chat.dto';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@Resolver('Chats')
export class ChatsResolver {
    constructor(private readonly chatsService: ChatsService){}

    @Query(() => String)
    async welcome() {
        return "Welcome from IONS Chat room!";
    }

    @Query(() => [ChatType])
    async chats() {
        return this.chatsService.findAll();
    }

    //@Args('sender_id') id: string

    @Query(() => [ChatType])
    async chatHistory() {
        return this.chatsService.findAllHistory();
    }

    @Query(() => [ChatType])
    async chatList(@Args('room_id') id: string) {
        return this.chatsService.findOneByID(id);
    }

    @Mutation(()=> ChatType)
    async chatHistoryInsert(@Args('input') input: ChatsInput){
        const chat = this.chatsService.createChatHistory(input);
        pubSub.publish('NEW_HISTORY', {newHistory: input});
        return chat;
    }

    @Mutation(() => ChatType)
    async createChat(@Args('input') input: ChatsInput){
        const chat = this.chatsService.create(input);
        pubSub.publish('NEW_MESSAGE', {newMessage: input});
        return chat;
    }

    @Subscription(() => ChatType)
    async newMessage() {
        return pubSub.asyncIterator('NEW_MESSAGE');
    }

    @Subscription(() => ChatType)
    async newHistory() {
        return pubSub.asyncIterator('NEW_HISTORY');
    }

}
