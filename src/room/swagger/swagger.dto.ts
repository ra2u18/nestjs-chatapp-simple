import { ApiProperty } from '@nestjs/swagger';
import { RoomDto, UserDto, MessageDto } from '../room.entity';

export class CreateRoomBodySwagger {
  @ApiProperty({
    name: 'room',
    description: 'Room object',
    type: Object,
    example: { roomTitle: 'Powerpuff girls', roomDescription: 'za best' },
  })
  room: {
    roomTitle: string;
    roomDescription: string;
  };
}

export class AddUserToRoomBodySwagger {
  @ApiProperty({
    name: 'user',
    description: 'User object',
    type: Object,
    example: { email: 'user4@gmail.com' },
  })
  user: {
    email: string;
  };
}

export class SendMessageToRoomBodySwagger {
  @ApiProperty({
    name: 'message',
    description: 'Message object',
    type: Object,
    example: { payload: 'hello world' },
  })
  message: {
    payload: string;
  };
}

export class GetLatestMessagesBodySwagger {
  @ApiProperty({
    name: 'limit',
    description: 'Number of messages to retrieve',
    type: Number,
    example: 1,
    required: false,
  })
  limit?: number;

  @ApiProperty({
    name: 'cursorId',
    description: 'The cursorId for the next messages',
    type: String,
    example: 'clgf8h7s20000c',
    required: false,
  })
  cursorId?: string;
}

export class RoomWithUsersDto {
  @ApiProperty({
    name: 'id',
    description: 'The unique identifier for the room',
    type: 'string',
    example: 'clgf0xw4q0004cxkk43dqzp2p',
  })
  id: string;

  @ApiProperty({
    name: 'roomTitle',
    description: 'The title of the room',
    type: 'string',
    example: 'Avengers',
  })
  roomTitle: string;

  @ApiProperty({
    name: 'roomDescription',
    description: 'The description of the room',
    type: 'string',
    example: 'Best room ever',
  })
  roomDescription: string;

  @ApiProperty({
    name: 'hostId',
    description: 'The unique identifier for the user who created the room',
    type: 'string',
    example: 'clgf0xika0002cxkkhmg5xw96',
  })
  hostId: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'The date and time when the room was created',
    type: 'string',
    example: '2023-04-13T11:15:37.322Z',
  })
  createdAt: string;

  @ApiProperty({
    name: 'updatedAt',
    description: 'The date and time when the room was last updated',
    type: 'string',
    example: '2023-04-13T11:15:37.322Z',
  })
  updatedAt: string;

  @ApiProperty({
    name: 'users',
    description: 'The list of users in the room',
    type: [UserDto],
  })
  users: UserDto[];
}

export class RoomWithMessagesDto {
  @ApiProperty({
    example: 'clgf0xw4q0004cxkk43dqzp2p',
    description: 'The ID of the room.',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'powerpuff girls',
    description: 'The title of the room.',
    type: String,
  })
  roomTitle: string;

  @ApiProperty({
    example: 'za best',
    description: 'The description of the room.',
    type: String,
  })
  roomDescription: string;

  @ApiProperty({
    example: 'clgf0xika0002cxkkhmg5xw96',
    description: 'The ID of the user who created the room.',
    type: String,
  })
  hostId: string;

  @ApiProperty({
    example: '2023-04-13T11:15:37.322Z',
    description: 'The timestamp of when the room was created.',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-04-13T11:15:37.322Z',
    description: 'The timestamp of when the room was last updated.',
    type: String,
  })
  updatedAt: string;

  @ApiProperty({
    type: [MessageDto],
    example: [
      {
        id: 'clgf1gzu40001cx3c4rj06pa8',
        payload: 'hello world',
        authorId: 'clgf0xika0002cxkkhmg5xw96',
        roomId: 'clgf0xw4q0004cxkk43dqzp2p',
        createdAt: '2023-04-13T11:30:28.588Z',
        updatedAt: '2023-04-13T11:30:28.594Z',
      },
      {
        id: 'clgf1h3oj0003cx3c99bk8xlq',
        payload: "How's everyone",
        authorId: 'clgf0xika0002cxkkhmg5xw96',
        roomId: 'clgf0xw4q0004cxkk43dqzp2p',
        createdAt: '2023-04-13T11:30:33.572Z',
        updatedAt: '2023-04-13T11:30:33.576Z',
      },
    ],
    description: 'The list of messages in the room.',
  })
  messages: MessageDto[];
}

export class SendMessageResponseDto {
  @ApiProperty({
    description: 'Details of the room where the message was sent',
    type: RoomWithMessagesDto,
  })
  room: RoomWithMessagesDto;
}

export class AddUserToRoomResponseDto {
  @ApiProperty({
    description: 'Details of the room where user was added',
    type: RoomWithUsersDto,
  })
  room: RoomWithUsersDto;
}

export class GetLatestMessagesResponseDto {
  @ApiProperty({
    description: 'List of latest messages in the room',
    type: [MessageDto],
  })
  messages: MessageDto[];

  @ApiProperty({
    description: 'ID of the last message in the list',
    example: 'clgf1hvek0005cx3cso1oy87f',
  })
  cursorId: string;
}
