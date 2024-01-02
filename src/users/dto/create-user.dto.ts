import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
   @IsNotEmpty()
   @IsString()
   firstName: string;

   @IsOptional()
   @IsString()
   middleName?: string;

   @IsNotEmpty()
   @IsString()
   lastName: string;

   @IsNotEmpty()
   @IsInt()
   nationalId: number;
   

   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsNotEmpty()
   @IsString()
   @MaxLength(15)
   @MinLength(9)
   phoneNumber: string;

   @IsNotEmpty()
   @MinLength(4)
   password: string;

}








