import { IsArray, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PostCategoryEnum, PostStatusEnum } from "../enums";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsEnum(PostStatusEnum)
    status: string;

    @ApiProperty()
    @IsArray()
    @IsEnum(PostCategoryEnum, {each:true})
    category: PostCategoryEnum[]

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    mainImage:string;

}
