import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class AssignPermissionsToRoleDto{
    @IsUUID()
    @ApiProperty()
    roleId: string;

    @IsArray()
    @ApiProperty()
    permissionIds:string[];
}