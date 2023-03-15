import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty({message: 'заполните email'})
  email: string;
  @IsString()
  @IsNotEmpty({message: 'введите пароль'})
  password: string;
}