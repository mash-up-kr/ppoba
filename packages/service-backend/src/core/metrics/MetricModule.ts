import { Module } from '@nestjs/common';
import { MetricController } from './MetricController';

@Module({
  controllers: [MetricController],
})
export class MetricModule {}
