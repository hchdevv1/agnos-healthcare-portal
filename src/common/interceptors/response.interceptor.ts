/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const httpContext =
      context.switchToHttp();

    const response =
      httpContext.getResponse();

    const request =
      httpContext.getRequest();

    return next.handle().pipe(
      map((data) => {
        /**
         * HTTP Status Code
         */
        const statusCode =
          response.statusCode ||
          HttpStatus.OK;

        /**
         * Default Meta
         */
        const meta: Record<
          string,
          any
        > = {
          apiVersion: 'v1',

          path: request.originalUrl,

          //timestamp: new Date().toISOString(),
        };

        /**
         * Default Result
         */
        let result = data;

        /**
         * Pagination Auto Detect
         *
         * Expected format:
         *
         * return {
         *   data: [],
         *   pagination: {}
         * }
         */
        if (
          data &&
          typeof data === 'object' &&
          'pagination' in data &&
          'data' in data
        ) {
          meta.pagination =
            data.pagination;

          result = data.data;
        }

        /**
         * Final Standard Response
         */
        return {
          success: true,

          statusCode,

          message: 'Success',

          responseStatus: {
            code: 'SUCCESS',

            description: 'Success',
          },

          meta,

          result,
        };
      }),
    );
  }
}