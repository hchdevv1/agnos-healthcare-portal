/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();

    const response =
      ctx.getResponse<Response>();

    const request =
      ctx.getRequest<Request>();

    let status =
      HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any =
      'Internal Server Error';

    let responseStatus = {
      code: 'INTERNAL_SERVER_ERROR',
      description: 'Unexpected system error',
    };

    let result: any = null;

    /**
     * Handle NestJS HttpException
     */
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse =
        exception.getResponse();

      /**
       * Validation / Custom Error
       */
      if (
        typeof exceptionResponse === 'object'
      ) {
        const errorResponse =
          exceptionResponse as any;

        /**
         * ValidationPipe errors
         */
        if (
          Array.isArray(errorResponse.message)
        ) {
          message = 'Validation Error';

          result = {
            errors:
              errorResponse.message,
          };

          responseStatus = {
            code: 'VALIDATION_ERROR',
            description:
              'Invalid request payload',
          };
        } else {
          message =
            errorResponse.message ||
            exception.message;

          responseStatus = {
            code:
              errorResponse.code ||
              this.mapStatusCode(status),

            description:
              errorResponse.description ||
              message,
          };

          result =
            errorResponse.result || null;
        }
      } else {
        message = exceptionResponse;

        responseStatus = {
          code: this.mapStatusCode(status),

          description: String(
            exceptionResponse,
          ),
        };
      }
    }

    /**
     * Unknown System Error
     */
    else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,

      statusCode: status,

      message,

      responseStatus,

      meta: {
        apiVersion: 'v1',
        path: request.originalUrl,
        timestamp:
          new Date().toISOString(),
      },

      result,
    });
  }

  private mapStatusCode(
    status: number,
  ): string {
    switch (status) {
      case 400:
        return 'BAD_REQUEST';

      case 401:
        return 'UNAUTHORIZED';

      case 403:
        return 'FORBIDDEN';

      case 404:
        return 'NOT_FOUND';

      case 409:
        return 'CONFLICT';

      case 422:
        return 'UNPROCESSABLE_ENTITY';

      case 500:
        return 'INTERNAL_SERVER_ERROR';

      default:
        return 'UNKNOWN_ERROR';
    }
  }
}