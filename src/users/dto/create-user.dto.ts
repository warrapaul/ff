import { IsDate, IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserAccStatusEnum } from "../enums";
import { Role } from "src/roles/entities/role.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   firstName: string;

   @ApiProperty()
   @IsOptional()
   @IsString()
   middleName?: string;


   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   lastName: string;


   @ApiProperty()
   @IsNotEmpty()
   @IsInt()
   nationalId: number;

   @ApiProperty()
   @IsDateString()
   dob: Date;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   gender: string;


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
   @IsString()
   @MaxLength(15)
   @MinLength(9)
   phoneNumberSecondary?: string;
   

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
   profilePic?: string;

   @ApiProperty()
   @IsOptional()
   @IsString()
   idPicFront?: string;

   @ApiProperty()
   @IsOptional()
   @IsString()
   idPicBack?: string;
   
   @ApiProperty()
   @IsOptional()
   @IsString()
   role: Role;

}








