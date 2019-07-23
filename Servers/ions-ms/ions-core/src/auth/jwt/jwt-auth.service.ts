import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtAuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}

    public async signUser(email: string): Promise<string> {
        if (!email) {
            throw new UnauthorizedException();
        }

        const user: JwtPayload = { email: email };
        return this.jwtService.sign(user);
    }

    public async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findOneByEmail(payload.email);
    }
}
