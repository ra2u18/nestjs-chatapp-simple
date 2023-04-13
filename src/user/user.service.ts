import { PrismaService } from '@app/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateUserDto, LoginUserDto } from '@app/user/user.dto';
import { UserEntity, UserResponse } from '@app/user/user.entitiy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...userWithoutPassword } = createUserDto;

    const userByEmail = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (userByEmail) {
      throw new HttpException(
        'Email is taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.prisma.user.create({
      data: { ...userWithoutPassword, hashedPassword },
    });

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await this.comparePassword(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    this.prisma.exclude(user, ['hashedPassword']);
    return user;
  }

  buildResponse(user: UserEntity): UserResponse {
    this.prisma.exclude(user, ['hashedPassword']);

    return {
      user: {
        ...user,
        token: this.createToken(user),
      },
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      Logger.error('Error hashing password', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async comparePassword(password: string, hashedPw: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPw);
      return isMatch;
    } catch (error) {
      Logger.error('Error comparing password');
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  createToken(user: UserEntity, expiresIn = '1d'): string {
    const secret = this.config.get<string>('jwt_secret');

    try {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          roles: user.roles,
        },
        secret,
        { expiresIn },
      );
      return token;
    } catch (error) {
      Logger.error('Error creating token', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  verifyToken(token: string, secret: string): any {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      Logger.error('Error verifying token', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
