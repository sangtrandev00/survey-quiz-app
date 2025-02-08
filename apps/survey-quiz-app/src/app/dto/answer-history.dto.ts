// answer-history.dto.ts
export class CreateAnswerHistoryDto {
    surveyId: string;
    questionId: string;
    answer: string;
    userId?: string;
}