import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  readonly roomTitle: string;
  @IsNotEmpty()
  readonly roomDescription: string;
}

export class UserToRoomDto {
  @IsNotEmpty()
  readonly email: string;
}

export class MessageDto {
  @IsNotEmpty()
  readonly payload: string;
}

export class GetMessagesQueryDto {
  @IsOptional()
  @IsNumber()
  readonly limit?: number;

  @IsOptional()
  readonly cursorId?: string;
}
