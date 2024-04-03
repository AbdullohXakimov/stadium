import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stadium_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  impression: string;
}
