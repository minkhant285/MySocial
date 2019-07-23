import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [JwtAuthService, JwtStrategy],
})
export class AuthModule {}
