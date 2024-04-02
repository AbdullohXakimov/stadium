import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @IsOptional()
  @IsNumber()
  stadium_id?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
