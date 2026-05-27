import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { VisitListDto } from './dto/visit-list.dto';
import { VisitListResponseDto } from './dto/visit-list-response.dto';
import { VisitsRepository } from './repositories/visits.repository';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { CreateEpisodeResponseDto } from './dto/create-episode-response.dto';
import { HisCreateEpisodeResponseDto } from './dto/external/his-create-episode-response.dto';
import { handleHisBusinessResponse } from '../../common/utils/his-response-handler';

@Injectable()
export class VisitsService {
  private readonly logger =
    new Logger(VisitsService.name);

  constructor(
    private readonly visitsRepository: VisitsRepository,
  ) {}

  async getVisitList(
    payload: VisitListDto,
  ): Promise<
    Omit<
      VisitListResponseDto,
      'StatusCode' | 'errors'
    >
  > {
    const response =
      await this.visitsRepository.getVisitList(
        payload,
      );

    if (
      !response ||
      typeof response.StatusCode !==
        'number'
    ) {
      this.logger.error(
        'TRAKCARE GetVisitList returned malformed response',
      );

      throw new BadGatewayException({
        message:
          'Invalid response from TRAKCARE service',
      });
    }

    switch (response.StatusCode) {
      case 200: {
        this.logger.log(
          'Visit list retrieved successfully',
        );

        /**
         * Remove integration-only fields
         * before returning public API response.
         */
        const {
          StatusCode,
          errors,
          ...result
        } = response;

        return result;
      }

      case 400:
        this.logger.warn(
          'TRAKCARE GetVisitList validation failed',
        );

        throw new BadRequestException({
          message:
            response.errors?.[0]
              ?.message ??
            'Validation failed',
          errors:
            response.errors ?? [],
        });

      case 404:
        this.logger.warn(
          'TRAKCARE GetVisitList not found',
        );

        throw new NotFoundException({
          message:
            response.errors?.[0]
              ?.message ??
            'Visit data not found',
          errors:
            response.errors ?? [],
        });

      case 409:
        this.logger.warn(
          'TRAKCARE GetVisitList conflict detected',
        );

        throw new ConflictException({
          message:
            response.errors?.[0]
              ?.message ??
            'Duplicate or conflicting data',
          errors:
            response.errors ?? [],
        });

      case 500:
        this.logger.error(
          'TRAKCARE GetVisitList returned server error',
        );

        throw new BadGatewayException({
          message:
            'TRAKCARE service unavailable',
        });

      default:
        this.logger.error(
          `Unexpected TRAKCARE GetVisitList StatusCode: ${response.StatusCode}`,
        );

        throw new BadGatewayException({
          message:
            'Unexpected response from TRAKCARE service',
        });
    }
  }
async createEpisode(
  payload: CreateEpisodeDto,
): Promise<CreateEpisodeResponseDto> {
  const response: HisCreateEpisodeResponseDto =
    await this.visitsRepository.createEpisode(
      payload,
    );

  /**
   * Validate malformed HIS payload
   */
  if (
    !response ||
    response.StatusCode === undefined
  ) {
    this.logger.error(
      `TRAKCARE CreateEpisode returned malformed response for HN ${payload.hn}`,
    );

    throw new BadGatewayException({
      message:
        'Malformed response from external visit service',
    });
  }

  handleHisBusinessResponse(
    response,
    this.logger,
    'TRAKCARE CreateEpisode',
  );

  this.logger.log(
    `TRAKCARE CreateEpisode successful for HN ${payload.hn}`,
  );

  return {
    hn: response.hn,
    en: response.en,
    en_status: response.en_status,
    appointment_id:
      response.appointment_id,
    doctorID: response.doctorID,
    location_code:
      response.location_code,
    note: response.note,
  };
}
}