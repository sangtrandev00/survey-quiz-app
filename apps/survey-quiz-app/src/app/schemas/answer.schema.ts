import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Answer {
    @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
    questionId: Types.ObjectId;

    @Prop({ required: true })
    value: string;
}

export type AnswerDocument = Answer & Document;
export const AnswerSchema = SchemaFactory.createForClass(Answer);