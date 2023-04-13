import { PrismaService } from '@app/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService, ConfigService],
})
export class RoomModule {}
