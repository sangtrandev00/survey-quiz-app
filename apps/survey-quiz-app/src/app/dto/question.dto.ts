// dto/question.dto.ts
import { IsString, IsEnum, IsOptional, IsArray, ArrayMinSize } from 'class-validator';
import { QuestionType } from '../schemas/question.schema';

export class CreateQuestionDto {
    @IsString()
    text: string;

    @IsEnum(QuestionType)
    type: QuestionType;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2)
    @IsOptional()
    options?: string[];
}

export class UpdateQuestionDto {
    @IsString()
    @IsOptional()
    text?: string;

    @IsEnum(QuestionType)
    @IsOptional()
    type?: QuestionType;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2)
    @IsOptional()
    options?: string[];
}