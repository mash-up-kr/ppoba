import { Controller, Get, Query } from '@nestjs/common';
import { User } from '@sentry/node';
import { AuthUser, Public } from '../../core/decorators';
import { AuthKakaoService } from './AuthKakaoService';
import { AuthService } from './AuthService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authKakaoService: AuthKakaoService,
    private readonly authService: AuthService
  ) {}

  @Get('/me')
  async getMe(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @Get('/verify')
  async verifyToken(): Promise<{}> {
    // auth guard에서 검증을 통과한다.
    return {};
  }

  @Public
  @Get('/kakao/login')
  async getLoginUrl(): Promise<{ loginUrl: string }> {
    return {
      loginUrl: await this.authKakaoService.getLoginUrl(),
    };
  }

  @Public
  @Get('/kakao/token')
  async getToken(@Query('code') code: string): Promise<{ token: string }> {
    return await this.authService.authenticate(code);
  }
}
