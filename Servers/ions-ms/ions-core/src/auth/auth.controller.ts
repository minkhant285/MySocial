import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { User } from '../users/models/user.interface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: JwtAuthService,
        private readonly userService: UsersService,
    ) {}

    @Post('login')
    public async login(@Body() user: User): Promise<any> {
        var dbUser = await this.userService.findOneByEmail(user.email);

        if (!dbUser || (dbUser.password !== user.password)) {
            throw new UnauthorizedException();
        }

        var token = await this.authService.signUser(user.email);
        //return token;
        return {status:"SUCCESS",name:dbUser.name,id:dbUser.id,token:token,email:dbUser.email};
    }
}
