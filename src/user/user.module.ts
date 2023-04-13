import { Module } from '@nestjs/common';

import { PrismaService } from '@app/prisma/prisma.service';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UserService, PrismaService, ConfigService],
  controllers: [UserController],
})
export class UserModule {}
