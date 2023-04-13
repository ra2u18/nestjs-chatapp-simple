import { PrismaService } from '@app/prisma/prisma.service';
import { UserEntity } from '@app/user/user.entitiy';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { CreateRoomDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async createRoom(
    createRoomDto: CreateRoomDto,
    user: UserEntity,
  ): Promise<Partial<CreateRoomDto>> {
    const roomCap = this.config.get<number>('room_cap');

    // Grab all rooms hosted by this user, to check
    // whether we can create more rooms or stop here
    const rooms = await this.prisma.room.findMany({
      where: { hostId: user.id },
    });

    if (rooms.length > roomCap) {
      throw new HttpException(
        `You can create only ${roomCap} rooms at max`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // If rooms.length < room_cap we can safely create a room
    const newRoom = await this.prisma.room.create({
      data: {
        ...createRoomDto,
        hostId: user.id,
        users: {
          connect: { id: user.id },
        },
      },
    });

    return newRoom;
  }
}
