import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  stadium_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  impression?: string;
}
