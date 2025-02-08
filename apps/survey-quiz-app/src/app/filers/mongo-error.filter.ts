// filters/mongo-error.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoErrorFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        switch (exception.code) {
            case 11000: // Duplicate key error
                status = HttpStatus.CONFLICT;
                message = 'Duplicate entry';
                break;
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            message,
            error: exception.name,
            timestamp: new Date().toISOString(),
        });
    }
}