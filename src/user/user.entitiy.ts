import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;

  @ApiProperty({
    name: 'name',
    type: String,
    nullable: false,
    description: 'the name of the registered user',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    name: 'email',
    type: String,
    nullable: false,
    description: 'the email of the registered user',
    example: 'john@gmail.com',
  })
  email: string;
  hashedPassword: string;

  @ApiProperty({
    name: 'roles',
    type: Array<Role>,
    nullable: false,
    description: 'roles a user has',
    example: ['USER', 'ADMIN'],
  })
  roles: Role[];

  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  user: Omit<UserEntity, 'hashedPassword'> & { token: string };
}
