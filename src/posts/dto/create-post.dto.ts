import { IsArray, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PostCategoryEnum, PostStatusEnum } from "../enums";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    @IsEnum(PostStatusEnum)
    status: string;

    @IsArray()
    @IsEnum(PostCategoryEnum, {each:true})
    category: PostCategoryEnum[]

    @IsString()
    description: string;
}
