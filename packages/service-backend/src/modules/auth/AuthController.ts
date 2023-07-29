import { Controller, Get, Headers, Query } from '@nestjs/common';
import { AuthKakaoService } from './AuthKakaoService';
import { AuthService } from './AuthService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authKakaoService: AuthKakaoService,
    private readonly authService: AuthService
  ) {}

  @Get('/verify')
  async verifyToken(@Headers('Authorization') authorizationHeader: string) {
    const [_, token] = authorizationHeader.split(' ');
    await this.authService.decode(token);
    return {};
  }

  @Get('/kakao/login')
  async getLoginUrl(): Promise<{ loginUrl: string }> {
    return {
      loginUrl: await this.authKakaoService.getLoginUrl(),
    };
  }

  @Get('/kakao/token')
  async getToken(@Query('code') code: string): Promise<{ token: string }> {
    return await this.authService.authenticate(code);
  }
}
