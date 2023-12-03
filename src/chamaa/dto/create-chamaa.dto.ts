import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateChamaaDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    registrationNumber: string;    

    @IsOptional()
    @IsString()
    locationCounty: string;

    @IsOptional()
    @IsString()
    locationSubCounty: string;

    @IsOptional()
    @IsString()
    locationWard: string;

}
