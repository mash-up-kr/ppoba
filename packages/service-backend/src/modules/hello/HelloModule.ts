import { Module } from '@nestjs/common';
import { HelloService } from './HelloService';
import { HelloController } from './HelloController';

@Module({
  providers: [HelloService],
  controllers: [HelloController],
})
export class HelloModule {}
