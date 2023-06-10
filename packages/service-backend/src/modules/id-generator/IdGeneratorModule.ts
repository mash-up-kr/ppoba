import { Module } from '@nestjs/common';
import { IdGeneratorService } from './IdGeneratorService';

@Module({
  providers: [IdGeneratorService],
  exports: [IdGeneratorService],
})
export class IdGeneratorModule {}
