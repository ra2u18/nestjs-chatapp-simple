import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '@app/config';
import { AppService } from '@app/app.service';
import { AppController } from '@app/app.controller';
import { PrismaModule } from '@app/prisma/prisma.module';
import { HealthModule } from '@app/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
