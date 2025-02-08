// survey.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from '../schemas/survey.schema';
import { CreateSurveyDto, UpdateSurveyDto } from '../dto/survey.dto';
import { PaginationQueryDto } from '../interfaces/pagination-query.interface';

@Injectable()
export class SurveyService {
    constructor(
        @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>
    ) { }

    async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
        const createdSurvey = new this.surveyModel(createSurveyDto);
        return createdSurvey.save();
    }

    async findAll(): Promise<Survey[]> {
        return this.surveyModel.find().exec();
    }

    async findOne(id: string): Promise<Survey> {
        return this.surveyModel.findById(id).exec();
    }

    async update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
        return this.surveyModel
            .findByIdAndUpdate(id, updateSurveyDto, { new: true })
            .exec();
    }

    async remove(id: string): Promise<Survey> {
        return this.surveyModel.findByIdAndDelete(id).exec();
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{
        data: Survey[];
        total: number;
        limit: number;
        offset: number;
    }> {
        const { limit = 10, offset = 0, sort, filter } = query;

        let filterQuery = {};
        if (filter) {
            filterQuery = {
                $or: [
                    { title: { $regex: filter, $options: 'i' } },
                    { description: { $regex: filter, $options: 'i' } },
                ],
            };
        }

        const [data, total] = await Promise.all([
            this.surveyModel
                .find(filterQuery)
                .sort(sort)
                .skip(offset)
                .limit(limit)
                .exec(),
            this.surveyModel.countDocuments(filterQuery),
        ]);

        return {
            data,
            total,
            limit,
            offset,
        };
    }

}