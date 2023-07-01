import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { AppModule } from './AppModule';
import { setupSwagger } from './core/docs';

export async function bootstrap(): Promise<{ app: NestExpressApplication; instance: Express }> {
  const logger = new Logger();
  const instance = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(instance),
    { logger }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.setGlobalPrefix('/v1');
  setupSwagger(app);
  await app.init();

  return { app, instance };
}
