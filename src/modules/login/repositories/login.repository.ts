import axios, {
  AxiosInstance,
} from 'axios';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { LoginRequestDto } from '../dto/login-request.dto';

import { HisLoginResponseDto } from '../dto/external/his-login-response.dto';

import {
  handleHisTransportError,
} from '../../../common/utils/his-transport-error-handler';

@Injectable()
export class LoginRepository {
  private readonly logger = new Logger(
    LoginRepository.name,
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

  async login(
    payload: LoginRequestDto,
  ): Promise<HisLoginResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_LOGIN_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE Login API',
    );

    try {
      const response =
        await this.axiosClient.post<HisLoginResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE Login API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS Login',
      );
    }
  }
}