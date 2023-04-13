import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    name: 'email',
    description: 'email of the user',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly roles: Role[];
}

export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
