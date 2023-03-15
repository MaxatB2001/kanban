import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({message: "введите имя пользователя"})
  name: string;
  @IsNotEmpty({message: "введите почту"})
  @IsString()
  email: string;
  @IsNotEmpty({message: "введите пароль"})
  @IsString()
  password: string;
}
