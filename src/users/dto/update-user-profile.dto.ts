import { IsDate, IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateUserProfileDto{
    @IsString()
    @IsOptional()
    gender?: string; 

    @IsDateString()
    @IsOptional()
    dob?: Date;

    @IsString()
    @IsOptional()
    phoneNumberSecondary: string;

    @IsString()
    @IsOptional()
    idPicFront?: string;

    @IsString()
    @IsOptional()
    idPicBack?: string;

    @IsString()
    @IsOptional()
    profilePic?: string;

}