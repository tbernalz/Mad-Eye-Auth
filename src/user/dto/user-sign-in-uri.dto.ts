import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignInUriDto {
  @IsNotEmpty()
  @IsString()
  passwordSetUri: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
