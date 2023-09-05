import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsNotEmpty()
   @MinLength(4)
   password: string;

}
