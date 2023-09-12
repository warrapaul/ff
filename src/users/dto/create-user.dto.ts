import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserAccStatusEnum } from "../enums";
import { Role } from "src/roles/entities/role.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsNotEmpty()
   @IsString()
   @MaxLength(15)
   @MinLength(9)
   phoneNumber: string;

   @IsOptional()
   @IsEnum(UserAccStatusEnum)
   status: string;

   @IsNotEmpty()
   @MinLength(4)
   password: string;

   @IsOptional()
   @IsString()
   role: Role;

}
