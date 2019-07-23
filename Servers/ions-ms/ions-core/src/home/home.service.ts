import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Home, LocationData } from './models/home.interface';


@Injectable()
export class HomeService {
    public constructor(@InjectModel('Home') private readonly homeModel: Model<Home>) {}

    public async create(home: Home): Promise<Home> {
        const createdHome = new this.homeModel(home);
        return await createdHome.save();
    }

    async findAll(): Promise<Home[]> {
        return await this.homeModel.find().exec();
    }

    public async findOneById(id: string): Promise<any> {
        return await this.homeModel.findOne({id: id}).exec();
    }
    
    public async updateLocation( locData: LocationData ): Promise<LocationData> {
        console.log(locData.id);
        await this.homeModel.updateOne({id:locData.id},{$push:{ "location" : locData.location}});
        return await this.homeModel.find({id:locData.id}).exec();
    }
}
