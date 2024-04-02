import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsNumber()
  stadium_id: number;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
