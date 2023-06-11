import { Controller, Get, Query } from '@nestjs/common';
import { AuthKakaoService } from './AuthKakaoService';
import { AuthService } from './AuthService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authKakaoService: AuthKakaoService,
    private readonly authService: AuthService
  ) {}

  @Get('/kakao/login')
  async getLoginUrl() {
    return await this.authKakaoService.getLoginUrl();
  }

  @Get('/kakao/redirect')
  async redirect(@Query('code') code: string) {
    // TODO cookie or hmm
    const nextUrl = await this.authService.authenticate(code);
    // TODO: redirect to frontend
    return 'SUCCESS';
  }
}
