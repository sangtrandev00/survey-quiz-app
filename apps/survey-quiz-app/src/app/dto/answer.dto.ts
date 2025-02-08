// answer.dto.ts
export class CreateAnswerDto {
    questionId: string;
    value: string;
}

export class UpdateAnswerDto {
    value?: string;
}