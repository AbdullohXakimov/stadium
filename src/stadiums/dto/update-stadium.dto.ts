import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateStadiumDto } from './create-stadium.dto';

export class UpdateStadiumDto extends PartialType(CreateStadiumDto) {
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  contact_with?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  volume?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  district_id?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDate()
  buildAt?: Date;

  @IsOptional()
  @IsDate()
  start_time?: Date;

  @IsOptional()
  @IsDate()
  end_time?: Date;
}
