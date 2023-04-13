import { PrismaService } from '@app/prisma/prisma.service';
import { UserEntity } from '@app/user/user.entitiy';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { Message, Room, User } from '@prisma/client';
import { CreateRoomDto, MessageDto, UserToRoomDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async createRoom(
    createRoomDto: CreateRoomDto,
    user: UserEntity,
  ): Promise<Room> {
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

  async addUserToRoom(
    userToRoomDto: UserToRoomDto,
    userId: string,
    roomId: string,
  ): Promise<Room & { users: User[] }> {
    // Check that the user who s doing the request is the hostid
    const room = await this.prisma.room.findFirst({
      where: { id: roomId },
      include: { users: true },
    });

    if (room.hostId !== userId) {
      throw new HttpException(
        `You cannot add users to room: ${roomId} with title: ${room.roomTitle}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Check that the user who's doing the request it's not adding himself
    // in the room or an existing user
    const userToBeAdded = await this.prisma.user.findFirst({
      where: { email: userToRoomDto.email },
    });

    if (this.roomHasUser(room, userToBeAdded.id)) {
      throw new HttpException(
        `You cannot add the same user twice to room: ${roomId} with title: ${room.roomTitle}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const updatedRoom = await this.prisma.room.update({
      data: { users: { connect: { id: userToBeAdded.id } } },
      where: { id: room.id },
      include: { users: true },
    });

    return updatedRoom;
  }

  async sendMessageToRoom(
    messageDto: MessageDto,
    roomId: string,
    userId: string,
  ): Promise<Room & { messages: Message[] }> {
    // check if user is part of the room
    const room = await this.prisma.room.findFirst({
      where: { id: roomId },
      include: { users: true, messages: true },
    });

    if (!this.roomHasUser(room, userId)) {
      throw new HttpException(
        `You cannot send message to room with title: ${room.roomTitle}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Create the message record
    const message = await this.prisma.message.create({
      data: { payload: messageDto.payload, authorId: userId, roomId: room.id },
    });

    const updatedRoom = await this.prisma.room.update({
      data: { messages: { connect: { id: message.id } } },
      where: { id: room.id },
      include: { messages: true },
    });

    return updatedRoom;
  }

  roomHasUser(
    room: Room & { users: User[]; messages?: Message[] },
    userToBeAddedId: string,
  ) {
    return room.users.some((user: User) => user.id === userToBeAddedId);
  }

  buildResponse(room: Room & { users?: User[]; messages?: Message[] }) {
    if (room?.users && room.users.length > 0) {
      room.users.map((user) => this.prisma.exclude(user, ['hashedPassword']));
    }

    return { room };
  }
}
