import { HealthController } from './health/health.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { AnswerHistory, AnswerHistorySchema } from './schemas/answer-history.schema';
import { QuestionController } from './controllers/question.controller';
import { SurveyController } from './controllers/survey.controller';
import { SurveyService } from './services/survey.service';
import { QuestionService } from './services/question.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Survey.name, schema: SurveySchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Answer.name, schema: AnswerSchema },
      { name: AnswerHistory.name, schema: AnswerHistorySchema },
    ]),
  ],
  controllers: [
    HealthController,
    SurveyController,
    QuestionController
  ],
  providers: [SurveyService, QuestionService],
})
export class AppModule { }