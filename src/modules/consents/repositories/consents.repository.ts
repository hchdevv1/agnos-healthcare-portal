import axios, {
  AxiosInstance,
} from 'axios';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { ConsentDto } from '../dto/consent.dto';
import { UpdateConsentDto } from '../dto/update-consent.dto';

import { HisConsentResponseDto } from '../dto/external/his-consent-response.dto';

import { HisUpdateConsentResponseDto } from '../dto/external/his-update-consent-response.dto';

import {
  handleHisTransportError,
} from '../../../common/utils/his-transport-error-handler';

@Injectable()
export class ConsentsRepository {
  private readonly logger = new Logger(
    ConsentsRepository.name,
  );

  private readonly axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      timeout: Number(
        process.env.TRAKCARE_TIMEOUT_MS ??
        30000,
      ),
      headers: {
        'Content-Type':
          'application/json',
      },
    });
  }

  async getConsent(
    payload: ConsentDto,
  ): Promise<HisConsentResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_CONSENT_GET_CONSENT_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE GetConsent API',
    );

    try {
      const response =
        await this.axiosClient.post<HisConsentResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE GetConsent API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS GetConsent',
      );
    }
  }

  async updateConsent(
    payload: UpdateConsentDto,
  ): Promise<HisUpdateConsentResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_CONSENT_UPDATE_CONSENT_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE UpdateConsent API',
    );

    try {
      const response =
        await this.axiosClient.post<HisUpdateConsentResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE UpdateConsent API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS UpdateConsent',
      );
    }
  }
}