// question.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseFilters,
    NotFoundException,
    BadRequestException
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto/question.dto';
import { MongoErrorFilter } from '../filers/mongo-error.filter';

@Controller('questions')
@UseFilters(MongoErrorFilter)
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        try {
            // Validate options based on question type
            if (createQuestionDto.type === 'MULTIPLE_CHOICE' || createQuestionDto.type === 'SINGLE_CHOICE') {
                if (!createQuestionDto.options || createQuestionDto.options.length < 2) {
                    throw new BadRequestException('Multiple/Single choice questions must have at least 2 options');
                }
            }
            return await this.questionService.create(createQuestionDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.questionService.findAll();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const question = await this.questionService.findOne(id);
            if (!question) {
                throw new NotFoundException(`Question with ID ${id} not found`);
            }
            return question;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(error.message);
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
        try {
            const question = await this.questionService.update(id, updateQuestionDto);
            if (!question) {
                throw new NotFoundException(`Question with ID ${id} not found`);
            }
            return question;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(error.message);
        }
    }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const question = await this.questionService.remove(id);
      if (!question) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  @Delete('all')
  async removeAll() {
    try {
      await this.questionService.removeAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('pagination')
  async pagination() {
    return this.questionService.pagination();
  }
}
