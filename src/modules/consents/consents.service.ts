import {
  BadGatewayException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { ConsentsRepository } from './repositories/consents.repository';

import { ConsentDto } from './dto/consent.dto';
import { ConsentResponseDto } from './dto/consent-response.dto';

import { UpdateConsentDto } from './dto/update-consent.dto';
import { UpdateConsentResponseDto } from './dto/update-consent-response.dto';
import { HisConsentResponseDto } from './dto/external/his-consent-response.dto';
import { HisUpdateConsentResponseDto } from './dto/external/his-update-consent-response.dto';
import { handleHisBusinessResponse } from '../../common/utils/his-response-handler';

@Injectable()
export class ConsentsService {
  private readonly logger = new Logger(
    ConsentsService.name,
  );

  constructor(
    private readonly consentsRepository: ConsentsRepository,
  ) {}

  async getConsent(
    consentDto: ConsentDto,
  ): Promise<ConsentResponseDto> {
    const response: HisConsentResponseDto =
      await this.consentsRepository.getConsent(
        consentDto,
      );

    if (!response) {
      this.logger.error(
        `TRAKCARE GetConsent returned empty response for HN ${consentDto.hn}`,
      );

      throw new BadGatewayException({
        message:
          'External consent service unavailable',
      });
    }

    if (
      !response.hn ||
      !Array.isArray(response.Consents)
    ) {
      this.logger.error(
        `TRAKCARE GetConsent returned malformed response for HN ${consentDto.hn}`,
      );

      throw new BadGatewayException({
        message:
          'Malformed response from external consent service',
      });
    }

    this.logger.log(
      `TRAKCARE GetConsent successful for HN ${consentDto.hn}`,
    );

    return {
      hn: response.hn,
      Consents: response.Consents,
    };
  }

  async updateConsent(
    updateConsentDto: UpdateConsentDto,
  ): Promise<UpdateConsentResponseDto> {
    const response: HisUpdateConsentResponseDto =
      await this.consentsRepository.updateConsent(
        updateConsentDto,
      );

    if (
      !response ||
      response.StatusCode === undefined
    ) {
      this.logger.error(
        `TRAKCARE UpdateConsent returned malformed response for HN ${updateConsentDto.hn}`,
      );

      throw new BadGatewayException({
        message:
          'Malformed response from external consent service',
      });
    }

    handleHisBusinessResponse(
      response,
      this.logger,
      'TRAKCARE UpdateConsent',
    );

    this.logger.log(
      `TRAKCARE UpdateConsent successful for HN ${updateConsentDto.hn}`,
    );

    return {
      StatusCode: response.StatusCode,
      errors: response.errors,
    };
  }
}