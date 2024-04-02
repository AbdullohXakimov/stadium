import { IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateRegionDto } from './create-region.dto';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
