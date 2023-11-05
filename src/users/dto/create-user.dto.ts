import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserAccStatusEnum } from "../enums";
import { Role } from "src/roles/entities/role.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   name: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsEmail()
   email: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   @MaxLength(15)
   @MinLength(9)
   phoneNumber: string;

   @ApiProperty()
   @IsOptional()
   @IsEnum(UserAccStatusEnum)
   status: string;

   @ApiProperty()
   @IsNotEmpty()
   @MinLength(4)
   password: string;

   @ApiProperty()
   @IsOptional()
   @IsString()
   profilePic: string;

   @ApiProperty()
   @IsOptional()
   @IsString()
   role: Role;

}
