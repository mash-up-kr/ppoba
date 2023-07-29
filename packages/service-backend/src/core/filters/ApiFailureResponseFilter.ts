import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiFailureResponse } from '@ppoba/types';
import { snakeCase } from 'case-anything';
import { inspect } from 'util';

@Catch()
export class ApiFailureResponseFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    if (error instanceof Error) {
      const apiFailureResponse: ApiFailureResponse = {
        ok: false,
        error: {
          name: snakeCase(error.name),
          message: error.message,
          stack: error.stack, // TODO: prod에선 지워버리기
        },
      };

      httpAdapter.reply(ctx.getResponse(), apiFailureResponse, 200);
    } else {
      // TODO: prod에선 내용 지워버리기
      httpAdapter.reply(ctx.getResponse(), inspect(error), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
