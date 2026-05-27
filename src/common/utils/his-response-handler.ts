import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';

export interface HisErrorItem {
  field?: string;
  message?: string;
}

export interface HisBusinessResponse {
  StatusCode?: number;
  errors?: HisErrorItem[];
}

export function handleHisBusinessResponse(
  response: HisBusinessResponse,
  logger: Logger,
  context: string,
): void {
  switch (response?.StatusCode) {
    case 400:
      logger.warn(
        `${context} validation failed`,
      );

      throw new BadRequestException({
        message:
          response.errors?.[0]?.message ??
          'Validation failed',

        errors: response.errors ?? [],
      });

    case 409:
      logger.warn(
        `${context} duplicate conflict`,
      );

      throw new ConflictException({
        message:
          response.errors?.[0]?.message ??
          'Duplicate data',

        errors: response.errors ?? [],
      });

    case 500:
      logger.error(
        `${context} returned server error`,
      );

      throw new BadGatewayException({
        message:
          'External HIS service error',
      });
  }
}