import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";


export class CreateResolutionDto {
    @IsString()
    @MinLength(10)
    text:string;


    @IsOptional()
    @IsBoolean()
    isPublic:boolean;
}
