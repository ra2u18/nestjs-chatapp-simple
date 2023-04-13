import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    example: 'John Doe',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@example.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'myPassword123',
  })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The roles of the user',
    type: Array,
    example: ['USER'],
  })
  readonly roles: Role[];
}

export class LoginUserDto {
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    example: 'user1@gmail.com',
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    example: 'password123',
  })
  @IsNotEmpty()
  readonly password: string;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'User object',
    type: Object,
    example: {
      id: 'clgf0xfz10000cxkk2dhouo7m',
      name: 'user1',
      email: 'user1@gmail.com',
      roles: ['USER'],
      createdAt: '2023-04-13T11:15:16.382Z',
      updatedAt: '2023-04-13T11:15:16.382Z',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsaGZ4MGZ6MTAwMDBj',
    },
  })
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
    token: string;
  };
}
