import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database';
import { MetricModule } from './core/metrics/MetricModule';
import { AuthModule } from './modules/auth/AuthModule';
import { UserModule } from './modules/user/UserModule';
import { CardModule } from './modules/card/CardModule';

@Module({
  imports: [MetricModule, DatabaseModule, UserModule, AuthModule,CardModule],
})
export class AppModule {}
