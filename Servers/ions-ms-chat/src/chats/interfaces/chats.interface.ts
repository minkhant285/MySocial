import { Document } from 'mongoose';

export interface Chats extends Document {
    readonly sender: string;
    readonly sender_name: string;
    readonly receiver: string;
    readonly receiver_name: string;
    readonly msg: string;
    readonly room_id: string;
    readonly sendTime: string;
    readonly date: string;
    readonly receiveTime: string;
}
