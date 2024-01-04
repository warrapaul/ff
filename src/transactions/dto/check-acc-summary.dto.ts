import { IsString, IsUUID } from "class-validator";

export class CheckAccSummaryDto{
    @IsString()
    @IsUUID()
    user: string;

    @IsString()
    @IsUUID()
    chamaa: string;
}