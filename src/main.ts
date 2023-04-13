if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';

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

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Setup openapi
  const config = new DocumentBuilder()
    .setTitle('chat hub')
    .setDescription('REST API for simple chat')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
};

bootstrap();
