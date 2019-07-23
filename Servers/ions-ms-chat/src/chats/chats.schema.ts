import * as mongoose from 'mongoose';

export const ChatsSchema = new mongoose.Schema({
    sender: String,
    sender_name: String,
    receiver: String,
    receiver_name: String,
    msg: String,
    sendTime: String,
    room_id: String,
    date: String,
    receiveTime: String
});
