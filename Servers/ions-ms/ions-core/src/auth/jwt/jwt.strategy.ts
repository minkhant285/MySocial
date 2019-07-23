import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAuthService } from './jwt-auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly authService: JwtAuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'secretKey',
        });
    }

    public async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
    }
}
