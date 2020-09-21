import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

const appPort = process.env.PORT || 3000;
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(appPort);
  Logger.log(`App listening on port ${appPort}`)
}
bootstrap();
