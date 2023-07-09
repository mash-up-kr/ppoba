import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database';
import { MetricModule } from './core/metrics/MetricModule';
import { AuthModule } from './modules/auth/AuthModule';
import { UserModule } from './modules/user/UserModule';

@Module({
  imports: [MetricModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
