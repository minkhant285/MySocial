import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { HomeService } from './home.service';
import { Home } from './models/home.interface';
import { UuidService } from 'src/common/services/uuid.service';

@Controller('home')
export class HomeController {
    constructor( 
        private readonly homeService : HomeService,
        private uuidService: UuidService

    ){}

    @Post()
    public async create(@Body() home: Home){
        home['id'] = this.uuidService.getUuid();
        return await this.homeService.create(home);
    }

    @Get()
    public async findAll() {
        return await this.homeService.findAll();
    }

    @Put('update')
    public async update(@Body() home) {
        return await this.homeService.updateLocation(home);
    }
}
