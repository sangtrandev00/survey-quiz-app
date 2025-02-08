// question.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto/question.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
    ) { }

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const createdQuestion = new this.questionModel(createQuestionDto);
        return createdQuestion.save();
    }

    async findAll(): Promise<Question[]> {
        return this.questionModel.find().exec();
    }

    async findOne(id: string): Promise<Question> {
        return this.questionModel.findById(id).exec();
    }

    async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
        return this.questionModel
            .findByIdAndUpdate(id, updateQuestionDto, { new: true })
            .exec();
    }

    async remove(id: string): Promise<Question> {
        return this.questionModel.findByIdAndDelete(id).exec();
    }

  async removeAll(): Promise<any> {
    return this.questionModel.deleteMany().exec()
  }

    async pagination() {
      return []
    }
}
