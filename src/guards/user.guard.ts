import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwrService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('User is unauthorized');

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token)
      throw new UnauthorizedException('User is unauthorized');

    async function verify(token: string, jwrService: JwtService) {
      let user: any;
      try {
        user = await jwrService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException('Invalid token');
      }

      if (!user) {
        throw new UnauthorizedException('User is unauthorized');
      }

      if (user.hasOwnProperty('is_creator')) {
        throw new ForbiddenException('You are not allowed to do this22!');
      }

      if (!user.is_active) {
        throw new BadRequestException('User is not active');
      }

      req.user = user;

      return true;
    }
    return verify(token, this.jwrService);
  }
}
