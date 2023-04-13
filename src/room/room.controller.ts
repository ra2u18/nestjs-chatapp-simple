import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/guards/user.guard';
import { UserEntity } from '@app/user/user.entitiy';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('rooms')
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('room') createRoomDto: CreateRoomDto,
  ): Promise<any> {
    const room = await this.roomService.createRoom(createRoomDto, currentUser);
    return room;
  }
}
