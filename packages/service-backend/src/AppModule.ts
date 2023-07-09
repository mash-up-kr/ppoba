import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database';
import { AuthModule } from './modules/auth/AuthModule';
import { UserModule } from './modules/user/UserModule';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
