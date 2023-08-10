import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '../user/UserModule';
import { AuthController } from './AuthController';
import { AuthGuard } from './AuthGuard';
import { AuthKakaoService } from './AuthKakaoService';
import { AuthService } from './AuthService';
import { JwtService } from './JwtService';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthKakaoService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
