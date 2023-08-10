import { Controller, Get } from '@nestjs/common';
import { Public } from '../decorators';
import { getSourceVersion } from '../env';

@Controller('metric')
export class MetricController {
  @Public
  @Get('/health')
  async health() {
    return {
      sha: getSourceVersion(),
    };
  }

  // TODO: test controller로 옮기기
  @Public
  @Get('/exception-test')
  async throwError() {
    throw new Error('exception test');
  }
}
