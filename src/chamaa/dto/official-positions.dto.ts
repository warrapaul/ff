import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class CreateOfficialPositionsDto{
    @IsString()
    position: string;

    @IsString()
    @IsOptional()
    roleDescription: string;

    @IsString()
    @IsUUID()
    chamaa: string;

   
}


export class UpdateOfficialPositionDto extends PartialType(CreateOfficialPositionsDto) {
    @IsOptional()
    @IsString()
    @IsUUID()
    userAccount: string;
}




