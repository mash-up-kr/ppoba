import { Controller, Get } from '@nestjs/common';
import { HelloService } from './HelloService';
import { ApiResponse } from '@ppoba/types';
import { HelloDocs as Docs } from './HelloDocs';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('/')
  @Docs.hello('greeting')
  async hello(): Promise<ApiResponse<{ message: string }>> {
    return {
      ok: true,
      message: await this.helloService.greeting(),
    };
  }
}
