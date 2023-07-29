import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { AppModule } from './AppModule';
import { setupSwagger } from './core/docs';
import * as Sentry from '@sentry/node';

export async function bootstrap(): Promise<{ app: NestExpressApplication; instance: Express }> {
  const logger = new Logger();
  const instance = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(instance),
    { logger, cors: true }
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

  const env = process.env.STAGE;
  if (env === 'prod' || env === 'dev') {
    Sentry.init({
      dsn: process.env.NODE_SENTRY_DSN,
      environment: env,
      tracesSampleRate: 1.0,
    });
  }

  await app.init();

  return { app, instance };
}
