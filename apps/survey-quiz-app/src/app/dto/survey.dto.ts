// dto/survey.dto.ts
import { IsString, IsOptional, IsBoolean, IsArray, ArrayMinSize } from 'class-validator';

export class CreateSurveyDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean = true;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @IsOptional()
    questions?: string[];
}

export class UpdateSurveyDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    questions?: string[];
}