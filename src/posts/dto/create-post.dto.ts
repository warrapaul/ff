import { IsArray, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PostStatus } from "../enums/post-status.enum";
import { PostCategory } from "../enums/post-category.enum";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    @IsEnum(PostStatus)
    status: string;

    @IsArray()
    @IsEnum(PostCategory, {each:true})
    category: PostCategory[]

    @IsString()
    description: string;
}
