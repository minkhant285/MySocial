import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
  
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    public handleRequest(err, user, info) {
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
    }
}
