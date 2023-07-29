import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './core/database';
import { ApiFailureResponseFilter } from './core/filters/ApiFailureResponseFilter';
import { ApiSuccessResponseInterceptor } from './core/interceptors/ApiSuccessResponseInterceptor';
import { MetricModule } from './core/metrics/MetricModule';
import { AuthModule } from './modules/auth/AuthModule';
import { CardModule } from './modules/card/CardModule';
import { DeckModule } from './modules/deck/DeckModule';
import { UserModule } from './modules/user/UserModule';

@Module({
  imports: [MetricModule, DatabaseModule, UserModule, AuthModule, CardModule, DeckModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiSuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ApiFailureResponseFilter,
    },
  ],
})
export class AppModule {}
