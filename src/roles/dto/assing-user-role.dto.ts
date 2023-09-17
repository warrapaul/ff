import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class AssignUserRoleDto{
    @IsUUID()
    @ApiProperty()
    userId: string;

    @IsUUID()
    @ApiProperty()
    roleId: string;
}