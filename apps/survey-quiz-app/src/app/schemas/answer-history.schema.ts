import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AnswerHistory {
    @Prop({ type: Types.ObjectId, ref: 'Survey' })
    surveyId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Question' })
    questionId: Types.ObjectId;

    @Prop({ required: true })
    answer: string;

    @Prop()
    userId: string;
}

export type AnswerHistoryDocument = AnswerHistory & Document;
export const AnswerHistorySchema = SchemaFactory.createForClass(AnswerHistory);