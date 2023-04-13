import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/guards/user.guard';
import { UserEntity } from '@app/user/user.entitiy';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateRoomDto,
  GetMessagesQueryDto,
  MessageDto,
  UserToRoomDto,
} from '@app/room/room.dto';
import { RoomService } from '@app/room/room.service';
import {
  AddUserToRoomBodySwagger,
  AddUserToRoomResponseDto,
  CreateRoomBodySwagger,
  GetLatestMessagesBodySwagger,
  GetLatestMessagesResponseDto,
  SendMessageToRoomBodySwagger,
} from '@app/room/swagger/swagger.dto';
import { RoomDto } from './room.entity';
import { HttpStatus } from '@nestjs/common/enums';

@ApiBearerAuth('access-token')
@ApiTags('api')
@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('rooms')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new room' })
  @ApiBody({
    type: CreateRoomBodySwagger,
  })
  @ApiResponse({
    type: RoomDto,
    status: HttpStatus.OK,
    description: 'Returns the created room.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Thrown when the user has exceeded the maximum room creation limit.',
  })
  async create(
    @User() currentUser: UserEntity,
    @Body('room') createRoomDto: CreateRoomDto,
  ): Promise<any> {
    const room = await this.roomService.createRoom(createRoomDto, currentUser);

    return this.roomService.buildResponse(room);
  }

  @Post('rooms/:roomId/users')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Add user to room' })
  @ApiBody({
    type: AddUserToRoomBodySwagger,
  })
  @ApiParam({
    name: 'roomId',
    description: 'Room ID',
    example: 'clgf28nuf0000cxc4o1b9zbqz',
  })
  @ApiResponse({
    type: AddUserToRoomResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Thrown when the room or user does not exist or the user is already in the room.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Thrown when the current user is not the host of the room.',
  })
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
  @ApiOperation({ summary: 'Send message to room' })
  @ApiBody({
    type: SendMessageToRoomBodySwagger,
  })
  @ApiParam({
    name: 'roomId',
    description: 'Room ID',
    example: 'clgf28nuf0000cxc4o1b9zbqz',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SendMessageToRoomBodySwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Thrown when the room does not exist.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Thrown when the current user is not a part of the room.',
  })
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
  @ApiOperation({ summary: 'Get all messages' })
  @ApiQuery({
    type: GetLatestMessagesBodySwagger,
  })
  @ApiParam({
    name: 'roomId',
    description: 'Room ID',
    example: 'clgf28nuf0000cxc4o1b9zbqz',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetLatestMessagesResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid parameters',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not authorized to access this room',
  })
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
      parseInt(limit, 10),
    );

    return messages;
  }
}
