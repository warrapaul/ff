import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class OfficialPositionDto{
    @IsString()
    position: string;

    @IsString()
    @IsOptional()
    roleDescription: string;
}

export class CreateMultipleOfficialPositionsDto{
    @IsString()
    @IsUUID()
    chamaa: string;
    
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=> OfficialPositionDto)
    positions: OfficialPositionDto[];
}



export class UpdateOfficialPositionsDto{
    @IsString()
    positionId: string;

    @IsString()
    @IsOptional()
    position: string;

    @IsString()
    @IsOptional()
    roleDescription: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    userAccount: string;
}



export class UpdateMultipleOfficialPositionsDto{
    @IsString()
    @IsUUID()
    chamaa: string;
    
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=> UpdateOfficialPositionsDto)
    positions: UpdateOfficialPositionsDto[];
}
