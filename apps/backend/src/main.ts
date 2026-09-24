import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument, // handler config for observing routes in prod
    routeConflictPolicy: {duplicate: 'error', shadow: 'warn'}, //  controlls registration order
  }
);
  app.set("query parser", "extended");  // HTTP adapter to use extended parser for complex queries
  await app.listen(process.env.PORT ?? 4000);
}
await bootstrap();
