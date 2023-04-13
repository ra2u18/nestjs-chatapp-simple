import { Body, Controller, Get, Post, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateUserSwaggerBodyDto,
  LoginUserSwaggerBodyDto,
} from './swagger/swagger.dto';
import { CreateUserDto, LoginUserDto, UserResponseDto } from './user.dto';
import { UserEntity, UserResponse } from './user.entitiy';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('api')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiOperation({ summary: 'Create a new user for our chat hub' })
  @ApiBody({ type: CreateUserSwaggerBodyDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Email is taken',
  })
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(user);
  }

  @Post('users/login')
  @ApiBody({ type: LoginUserSwaggerBodyDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in and received a token',
    type: UserResponseDto,
  })
  @ApiOperation({ summary: 'Logs in created user to chat hub' })
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildResponse(user);
  }
}
