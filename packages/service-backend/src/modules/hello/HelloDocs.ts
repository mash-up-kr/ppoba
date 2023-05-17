import { applyDecorators } from '@nestjs/common';
import { HelloController } from './HelloController';
import { ApiOperation } from '@nestjs/swagger';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const HelloDocs: SwaggerMethodDoc<HelloController> = {
  hello(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      })
    );
  },
};
