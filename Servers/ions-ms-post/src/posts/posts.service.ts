import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './interfaces/post.interfaces';
import { PostsType } from './types/graphql-types';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Posts') private readonly postsModel: Model<Posts>) { }

    async createPost(postsType: PostsType): Promise<Posts> {
        const createdPost = new this.postsModel(postsType);
        return await createdPost.save();
    }

    async findAll(): Promise<Posts[]> {
        return await this.postsModel.find().exec();
    }

    async findOneByUID(uid: string) {
        return await this.postsModel.find({ post_owner: uid });
    }

    async findOneByPID(pid: string): Promise<Posts[]> {
        return await this.postsModel.findOne({ post_id: pid }).exec();
    }

    async deletePost(post_id: string) {
        await this.postsModel.deleteMany({ post_id: post_id });
        return this.findAll();
    }

    async likePost(post_id: string, likeUser: string) {
        await this.postsModel.updateOne({ post_id: post_id }, { $push: { like: likeUser } }, { upsert: true });
        return this.findOneByPID(post_id);
    }

    async unlikePost(post_id: string, unlikeUser) {
        await this.postsModel.updateOne({ post_id: post_id }, { $pull: { like: unlikeUser } }, { upsert: true });
        return this.findOneByPID(post_id);
    }

    async commentPost(post_id: string, commentData: string) {
        await this.postsModel.updateOne({ post_id: post_id }, { $push: { comments: commentData } }, { upsert: true });
        return this.findOneByPID(post_id);
    }
}
