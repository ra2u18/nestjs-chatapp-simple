import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '@app/config';
import { AppService } from '@app/app.service';
import { AppController } from '@app/app.controller';
import { PrismaModule } from '@app/prisma/prisma.module';
import { HealthModule } from '@app/health/health.module';
import { UserModule } from './user/user.module';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RequestMethod } from '@nestjs/common/enums';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    UserModule,
    RoomModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
