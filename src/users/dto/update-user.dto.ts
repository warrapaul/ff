import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminUpdateUserDto extends PartialType(CreateUserDto) { }


export class UpdateUserProfileDto{ 
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;
 
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(15)
    @MinLength(9)
    phoneNumber?: string; 
    
    @ApiProperty()
    @IsOptional()
    @MinLength(4)
    password?: string;
 
    @ApiProperty()
    @IsOptional()
    @IsString()
    profilePic?: string; 
}
