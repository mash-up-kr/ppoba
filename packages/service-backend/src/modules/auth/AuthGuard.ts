import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from './AuthService';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<string[]>('public', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers.authorization;

    if (authorizationHeader) {
      const [_, token] = authorizationHeader.split(' ');
      const user = await this.authService.decode(token);

      Reflect.defineProperty(request, 'user', { value: user });
      return true;
    }

    throw new UnauthorizedException();
  }
}
