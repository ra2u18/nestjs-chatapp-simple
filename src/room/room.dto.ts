import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  readonly roomTitle: string;
  readonly roomDescription: string;
}

export class UserToRoomDto {
  readonly email: string;
}

export class MessageDto {
  readonly payload: string;
}
