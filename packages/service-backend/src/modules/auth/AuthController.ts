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
  async redirect(@Query('code') code: string, @Query() query: any) {
    console.log({ query });
    // TODO cookie or hmm
    // TODO: redirect to frontend
    return await this.authService.authenticate(code);
  }
}
