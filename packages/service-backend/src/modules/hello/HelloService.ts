import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  async greeting(): Promise<string> {
    return `Hello World!`;
  }
}
