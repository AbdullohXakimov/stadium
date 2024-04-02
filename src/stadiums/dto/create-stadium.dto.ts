import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateStadiumDto {
  @IsNumber()
  category_id: number;

  @IsNumber()
  owner_id: number;

  @IsNotEmpty()
  @IsString()
  contact_with: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  volume: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNumber()
  district_id: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsDate()
  buildAt: Date;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}
