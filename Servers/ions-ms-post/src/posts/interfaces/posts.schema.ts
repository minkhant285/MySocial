import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
    post_id: String,
    avatar: String,
    post_owner: String,
    name: String,
    time: String,
    contentUrl: [String],
    contentType: String,
    status: String,
    like: [String],
    comments: [String],
    share: Number,
    liked: Boolean,
    created_date: String
});