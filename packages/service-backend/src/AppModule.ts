import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database';
import { MetricModule } from './core/metrics/MetricModule';
import { AuthModule } from './modules/auth/AuthModule';
import { UserModule } from './modules/user/UserModule';
import { CardModule } from './modules/card/CardModule';
import {DeckModule} from "./modules/deck/DeckModule";

@Module({
  imports: [MetricModule, DatabaseModule, UserModule, AuthModule,CardModule, DeckModule],
})
export class AppModule {}
