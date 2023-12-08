import { PartialType } from '@nestjs/swagger';
import { CreateChamaaDto } from './create-chamaa.dto';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ChamaaStatusEnum } from 'src/users/enums';

export class UpdateChamaaDto extends PartialType(CreateChamaaDto) {
    @IsEnum(ChamaaStatusEnum)
    @IsOptional()
    status: ChamaaStatusEnum
}


export class UpdateChamaaProfile {
    @IsUUID()
    chamaa: string;

    @IsString()
    @IsOptional()
    locationCounty?: string;

    @IsString()
    @IsOptional()
    locationSubCounty?: string;

    @IsString()
    @IsOptional()
    locationWard?: string;

}