import { Controller, Get } from '@nestjs/common';
import { getSourceVersion } from '../env';

@Controller('metric')
export class MetricController {
  @Get('/health')
  async health() {
    return {
      sha: getSourceVersion(),
    };
  }
}
