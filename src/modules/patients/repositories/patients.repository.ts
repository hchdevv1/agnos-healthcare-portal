import axios, {
  AxiosInstance,
} from 'axios';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { SearchPatientDto } from '../dto/search-patient.dto';
import { CreatePatientResponseDto, } from '../dto/create-patient-response.dto';
import { PatientResponseDto, } from '../dto/search-patient-response.dto'
import { CreatePatientDto, } from '../dto/create-patient.dto';
import { UpdatePatientDto,} from '../dto/update-patient.dto';
import { handleHisTransportError,} from '../../../common/utils/his-transport-error-handler';
import { PatchPatientDto } from '../dto/patch-patient.dto';
interface TrakcareSearchPatientResponse {
  StatusCode: number;
  total: number;
  patient: PatientResponseDto[];
}

@Injectable()
export class PatientsRepository {
  private readonly logger = new Logger(
    PatientsRepository.name,
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

  async searchPatients(
    payload: SearchPatientDto,
  ): Promise<PatientResponseDto[]> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_SEARCH_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE SearchPatient API',
    );

    try {
      const response =
        await this.axiosClient.post<TrakcareSearchPatientResponse>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE SearchPatient API',
      );

      return Array.isArray(
        response.data?.patient,
      )
        ? response.data.patient
        : [];
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS SearchPatient',
      );
    }
  }

  async createPatient(
    payload: CreatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_CREATE_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE CreatePatient API',
    );

    try {
      const response =
        await this.axiosClient.post<CreatePatientResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE CreatePatient API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS CreatePatient',
      );
    }
  }

  async updatePatient(
    payload: UpdatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE UpdatePatient API',
    );

    try {
      const response =
        await this.axiosClient.put<CreatePatientResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE UpdatePatient API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS UpdatePatient',
      );
    }
  }
  async patchPatient(
  payload: PatchPatientDto,
): Promise<CreatePatientResponseDto> {
  const apiUrl =
    `${process.env.TRAKCARE_URL}` +
    `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
    `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

  this.logger.log(
    'Calling TRAKCARE PatchPatient API',
  );

  try {
    const response =
      await this.axiosClient.patch<CreatePatientResponseDto>(
        apiUrl,
        payload,
      );

    this.logger.log(
      'Received response from TRAKCARE PatchPatient API',
    );

    return response.data;
  } catch (error) {
    handleHisTransportError(
      error,
      this.logger,
      'HIS PatchPatient',
    );
  }
}
}