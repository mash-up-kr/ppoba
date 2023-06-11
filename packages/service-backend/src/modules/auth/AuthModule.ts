import { Module } from '@nestjs/common';
import { UserModule } from '../user/UserModule';
import { AuthController } from './AuthController';
import { AuthKakaoService } from './AuthKakaoService';
import { AuthService } from './AuthService';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService, AuthKakaoService],
})
export class AuthModule {}
