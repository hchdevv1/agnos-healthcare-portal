import axios, {
  AxiosInstance,
} from 'axios';

import {
  Injectable,Logger
} from '@nestjs/common';

import {
  ConfigService,
} from '@nestjs/config';

import { handleHisTransportError } from '../../../common/utils/his-transport-error-handler';

import {
  HisGetDoctorResponseDto,
} from '../dto/external/his-get-doctor-response.dto';

@Injectable()
export class DoctorprofilesHisRepository {
  private readonly axiosClient: AxiosInstance;

  private readonly logger =
    new Logger(
      DoctorprofilesHisRepository.name,
    );

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.axiosClient =
      axios.create({
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

  async getDoctorProfiles(
    payload: any,
  ): Promise<HisGetDoctorResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_DOCTORLIST_GET_DOCTOR_ENDPOINT}`;

    try {
      const response =
        await this.axiosClient.post<HisGetDoctorResponseDto>(
          apiUrl,
          payload,
        );

      return response.data;
    } catch (error) {
   handleHisTransportError(
  error,
  this.logger,
  'TRAKCARE Doctorlist API',
);
    }
  }
}