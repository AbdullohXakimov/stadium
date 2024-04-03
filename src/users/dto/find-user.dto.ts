import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  full_name?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  tg_link?: string;
}
