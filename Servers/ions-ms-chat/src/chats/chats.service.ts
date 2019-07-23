import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chats } from './interfaces/chats.interface';
import { ChatsInput } from './inputs/chats.input';

@Injectable()
export class ChatsService {
    constructor(@InjectModel('Chat') private readonly chatModel: Model<Chats>,
                @InjectModel('ChatHistory') private readonly chatHistoryModel: Model<Chats>
    ) {
    }
    async create(chatType: ChatsInput): Promise<Chats> {
        const createdChat = new this.chatModel(chatType);
        return await createdChat.save();
    }

    async createChatHistory(chatType: ChatsInput): Promise<any> {
      //this.removeHistory(chatType.sender,chatType.receiver);
        // var history = await this.findOneByCID(chatType.sender,chatType.receiver);
        // console.log(history.sender+"\n"+history.receiver);
        // if(chatType.sender == sender.sender && chatType.receiver == receiver.receiver){
            this.removeHistory(chatType.sender,chatType.receiver);
            const createdChat = new this.chatHistoryModel(chatType);
             return await createdChat.save();
        // }
        // const createdChat = new this.chatHistoryModel(chatType);
        // return await createdChat.save();
    }

    async findAll(): Promise<Chats[]> {
        return await this.chatModel.find().exec();
    }

    async findAllHistory(): Promise<Chats[]> {
        return await this.chatHistoryModel.find().exec();
    }

    async findOneByID(room_id: string): Promise<Chats> {
        return await this.chatModel.find({room_id: room_id}).exec();
    }

    async findOneByCID(s_id: string,r_id:string): Promise<any> {
        return await this.chatModel.find({sender: s_id, receiver:r_id}).exec();
    }

    async removeHistory(sid,rid): Promise<Chats> {
        return await this.chatHistoryModel.deleteMany({sender:sid,receiver:rid});
    }
}
