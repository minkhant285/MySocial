import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from './models/user.interface';
import { UsersService } from './users.service';
import { UuidService } from './../common/services/uuid.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private uuidService: UuidService
    ) { }

    @Post()
    public async create(@Body() user: User) {
        user['id'] = this.uuidService.getUuid();
        return await this.usersService.create(user);
    }

    @Get()
    @UseGuards(new JwtAuthGuard())
    public async findAll() {
        return await this.usersService.findAll();
    }

    @Put(':id')
    @UseGuards(new JwtAuthGuard())
    public async update(@Param('id') id, @Body() data: User) {
        return await this.usersService.updateUser(id, data);
    }

    @Delete(':id')
    @UseGuards(new JwtAuthGuard())
    public async delete(@Param('id') id) {
        return await this.usersService.deleteUser(id);
    }
}
