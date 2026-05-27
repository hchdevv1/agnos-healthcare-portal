import axios, {
  AxiosInstance,
} from 'axios';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { VisitListDto } from '../dto/visit-list.dto';
import { CreateEpisodeDto } from '../dto/create-episode.dto';

import { HisVisitListResponseDto } from '../dto/external/his-visit-list-response.dto';
import { HisCreateEpisodeResponseDto } from '../dto/external/his-create-episode-response.dto';

import {
  handleHisTransportError,
} from '../../../common/utils/his-transport-error-handler';

@Injectable()
export class VisitsRepository {
  private readonly logger = new Logger(
    VisitsRepository.name,
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

  async getVisitList(
    payload: VisitListDto,
  ): Promise<HisVisitListResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_VISIT_GET_VISIT_LIST_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE GetVisitList API',
    );

    try {
      const response =
        await this.axiosClient.post<HisVisitListResponseDto>(
          apiUrl,
          payload,
          {
            /**
             * HIS may return non-2xx
             * business responses.
             */
            validateStatus: () => true,
          },
        );

      this.logger.log(
        `Received response from TRAKCARE GetVisitList API with HTTP Status ${response.status}`,
      );

      return {
        ...response.data,

        /**
         * Normalize HIS StatusCode
         * into number type.
         */
        StatusCode: Number(
          response.data?.StatusCode ??
            response.status,
        ),
      };
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS GetVisitList',
      );
    }
  }

async createEpisode(
  payload: CreateEpisodeDto,
): Promise<HisCreateEpisodeResponseDto> {
  const apiUrl =
    `${process.env.TRAKCARE_URL}` +
    `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
    `${process.env.TRAKCARE_VISIT_CREATE_EPISODE_ENDPOINT}`;

  this.logger.log(
    'Calling TRAKCARE CreateEpisode API',
  );

  try {
    const response =
      await this.axiosClient.put<HisCreateEpisodeResponseDto>(
        apiUrl,
        payload,
        {
          /**
           * HIS may return non-2xx
           * business responses.
           */
          validateStatus: () => true,
        },
      );

    this.logger.log(
      `Received response from TRAKCARE CreateEpisode API with HTTP Status ${response.status}`,
    );

    return {
      ...response.data,

      /**
       * Normalize HIS StatusCode
       * into number type.
       */
      StatusCode: Number(
        response.data?.StatusCode ??
          response.status,
      ),
    };
  } catch (error) {
    handleHisTransportError(
      error,
      this.logger,
      'HIS CreateEpisode',
    );
  }
}
}