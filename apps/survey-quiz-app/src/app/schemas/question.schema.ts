import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum QuestionType {
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    SINGLE_CHOICE = 'SINGLE_CHOICE',
    TEXT = 'TEXT'
}

@Schema({ timestamps: true })
export class Question {
    @Prop({ required: true })
    text: string;

    @Prop({ type: String, enum: QuestionType, required: true })
    type: QuestionType;

    @Prop({ type: [String] })
    options: string[];
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);