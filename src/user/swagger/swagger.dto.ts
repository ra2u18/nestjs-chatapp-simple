import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../user.dto';

export class CreateUserSwaggerBodyDto {
  @ApiProperty({
    name: 'user',
    description: 'User object',
    example: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'myPassword123',
      roles: ['USER'],
    },
  })
  user: {
    email: CreateUserDto;
  };
}

export class LoginUserSwaggerBodyDto {
  @ApiProperty({
    name: 'user',
    description: 'User object',
    example: {
      email: 'johndoe@example.com',
      password: 'myPassword123',
    },
  })
  user: {
    email: LoginUserDto;
  };
}
