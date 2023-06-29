// import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class SignupDto extends CreateUserDto {}
// export class SignupDto {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @IsString()
//   @IsNotEmpty()
//   @MinLength(8)
//   password: string;
// }
