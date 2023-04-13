import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({
    description: 'Unique identifier of the created room',
    example: 'clgf28nuf0000cxc4o1b9zbqz',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the created room',
    example: 'powerpuff girls',
  })
  roomTitle: string;

  @ApiProperty({
    description: 'Description of the created room',
    example: 'za best',
  })
  roomDescription: string;

  @ApiProperty({
    description: 'Unique identifier of the host user who created the room',
    example: 'clgf221z60000cxzwpky0kicz',
  })
  hostId: string;

  @ApiProperty({
    description: 'Timestamp when the room was created',
    example: '2023-04-13T11:51:59.415Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Timestamp when the room was last updated',
    example: '2023-04-13T11:51:59.415Z',
  })
  updatedAt: string;
}

export class MessageDto {
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: 'clgf1hvek0005cx3cso1oy87f',
  })
  id: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'hello world',
  })
  payload: string;

  @ApiProperty({
    description: 'The date and time when the message was created',
    example: '2023-04-13T11:31:09.501Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'The date and time when the message was last updated',
    example: '2023-04-13T11:31:09.504Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'The unique identifier of the user who created the message',
    example: 'clgf0xika0002cxkkhmg5xw96',
  })
  authorId: string;

  @ApiProperty({
    description:
      'The unique identifier of the room to which the message belongs',
    example: 'clgf0xw4q0004cxkk43dqzp2p',
  })
  roomId: string;

  @ApiProperty({
    description: 'The cursor identifier for pagination',
    example: 'clgf1hvek0005cx3cso1oy87f',
  })
  cursorId: string;
}

export class UserDto {
  @ApiProperty({
    name: 'id',
    description: 'The unique identifier for the user',
    type: 'string',
    example: 'clgf0xfz10000cxkk2dhouo7m',
  })
  id: string;

  @ApiProperty({
    name: 'name',
    description: 'The name of the user',
    type: 'string',
    example: 'user1',
  })
  name: string;

  @ApiProperty({
    name: 'email',
    description: 'The email of the user',
    type: 'string',
    example: 'user1@gmail.com',
  })
  email: string;

  @ApiProperty({
    name: 'roles',
    description: 'The roles of the user',
    type: 'array',
    example: ['USER'],
  })
  roles: string[];

  @ApiProperty({
    name: 'createdAt',
    description: 'The date and time when the user was created',
    type: 'string',
    example: '2023-04-13T11:15:16.382Z',
  })
  createdAt: string;

  @ApiProperty({
    name: 'updatedAt',
    description: 'The date and time when the user was last updated',
    type: 'string',
    example: '2023-04-13T11:15:16.382Z',
  })
  updatedAt: string;
}
