import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  readonly roomTitle: string;
  readonly roomDescription: string;
}
