import { INestApplication, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

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
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
};

bootstrap();
