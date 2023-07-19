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

  // TODO: test controller로 옮기기
  @Get('/exception-test')
  async throwError() {
    throw new Error('exception test');
  }
}
