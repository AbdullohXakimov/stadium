import {  IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
