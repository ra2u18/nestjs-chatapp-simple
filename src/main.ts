if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { INestApplication, RequestMethod } from '@nestjs/common';

import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setup(app);
  await app.listen(process.env.PORT || 3000);
}

const setup = (app: INestApplication): INestApplication => {
  app.enableCors();

  // Exclude health endpoint from api
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  // Setup openapi
  const config = new DocumentBuilder()
    .setTitle('chat hub')
    .setDescription('REST API for simple chat')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
};

bootstrap();
