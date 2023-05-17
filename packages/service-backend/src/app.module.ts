import { Module } from '@nestjs/common';
import { HelloModule } from './modules/hello/HelloModule';

@Module({
  imports: [HelloModule],
})
export class AppModule {}
