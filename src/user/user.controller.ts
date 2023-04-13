import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiProperty,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserEntity, UserResponse } from './user.entitiy';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('api')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiOperation({ summary: 'Create a new user for our chat hub' })
  // @ApiCreatedResponse({ type: UserResponse })
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(user);
  }

  @Post('users/login')
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in and received a token',
    type: UserEntity,
  })
  @ApiOperation({ summary: 'Logs in created user to chat hub' })
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildResponse(user);
  }
}
