import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/guards/user.guard';
import { UserEntity } from '@app/user/user.entitiy';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import {
  CreateRoomDto,
  GetMessagesQueryDto,
  MessageDto,
  UserToRoomDto,
} from './room.dto';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('rooms')
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('room') createRoomDto: CreateRoomDto,
  ): Promise<any> {
    const room = await this.roomService.createRoom(createRoomDto, currentUser);

    return this.roomService.buildResponse(room);
  }

  @Post('rooms/:roomId/users')
  @UseGuards(AuthGuard)
  async addUserToRoom(
    @User() currentUser: UserEntity,
    @Body('user') userToRoomDto: UserToRoomDto,
    @Param('roomId') roomId: string,
  ) {
    const room = await this.roomService.addUserToRoom(
      userToRoomDto,
      currentUser.id,
      roomId,
    );

    return this.roomService.buildResponse(room);
  }

  @Post('rooms/:roomId/messages')
  @UseGuards(AuthGuard)
  async sendMessageToRoom(
    @User() currentUser: UserEntity,
    @Body('message') messageDto: MessageDto,
    @Param('roomId') roomId: string,
  ) {
    const room = await this.roomService.sendMessageToRoom(
      messageDto,
      roomId,
      currentUser.id,
    );

    return this.roomService.buildResponse(room);
  }

  @Get('rooms/:roomId/messages')
  @UseGuards(AuthGuard)
  async getLatestMessages(
    @User() currentUser: UserEntity,
    @Param('roomId') roomId: string,
    @Query() query: GetMessagesQueryDto,
  ) {
    let { limit, cursorId } = query;

    const messages = await this.roomService.getLatestMessages(
      roomId,
      currentUser.id,
      cursorId,
      limit,
    );

    return messages;
  }
}
