import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setup(app);

  await app.listen(3000);
}

const setup = (app: INestApplication): INestApplication => {
  return app;
};

bootstrap();
