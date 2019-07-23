import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.interface';
import { userDiscriminators } from './models/user.schema';

@Injectable()
export class UsersService {
    public constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {
        userDiscriminators(this.userModel);
    }

    public async create(user: User): Promise<User> {
        return await this.userModel.create(user);
    }

    public async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    public async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({email: email}).exec();
    }

    public async updateUser(id: string, user: any): Promise<User> {
        const foundUser = await this.userModel.findOne({id: id}).exec();
        Object.assign(foundUser, user);
        return await foundUser.save();
    }

    public async deleteUser(id: string): Promise<any> {
        return  await this.userModel.deleteOne({id: id});
    }
}