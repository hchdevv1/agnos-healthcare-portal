import axios, {
  AxiosInstance,
} from 'axios';

import {
  BadGatewayException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { handleHisTransportError } from '../../../common/utils/his-transport-error-handler';
import { GetAppointmentRequestDto } from '../dto/appointment-request.dto';
import { HisGetAppointmentResponseDto } from '../dto/external/his-get-appointment-response.dto';
import { HisGetDoctorSlotResponseDto } from '../dto/external/his-get-doctor-slot-response.dto';
import { GetDoctorSlotRequestDto } from '../dto/get-doctor-slot-request.dto';
import { CreateAppointmentRequestDto } from '../dto/create-appointment-request.dto';
import { HisCreateAppointmentResponseDto } from '../dto/external/his-create-appointment-response.dto';
import { CancelAppointmentRequestDto } from '../dto/cancel-appointment-request.dto';
import { HisCancelAppointmentResponseDto } from '../dto/external/his-cancel-appointment-response.dto';

@Injectable()
export class AppointmentsRepository {
  private readonly logger = new Logger(
    AppointmentsRepository.name,
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

  async getAppointment(
    payload: GetAppointmentRequestDto,
  ): Promise<HisGetAppointmentResponseDto[]> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_APPOINTMENT_GET_APPOINTMENT_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE GetAppointment API',
    );

    try {
      const response =
        await this.axiosClient.post<
          HisGetAppointmentResponseDto[]
        >(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE GetAppointment API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS GetAppointment',
      );
    }
  }

  async getDoctorSlot2(
    payload: GetDoctorSlotRequestDto,
  ): Promise<HisGetDoctorSlotResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_APPOINTMENT_GET_DOCTOR_SLOT_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE GetDoctorSlot API',
    );

    try {
      const response =
        await this.axiosClient.post<HisGetDoctorSlotResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE GetDoctorSlot API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS GetDoctorSlot',
      );
    }
  }
async getDoctorSlot(
  payload: GetDoctorSlotRequestDto,
): Promise<HisGetDoctorSlotResponseDto> {
  const apiUrl =
    `${process.env.TRAKCARE_URL}` +
    `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
    `${process.env.TRAKCARE_APPOINTMENT_GET_DOCTOR_SLOT_ENDPOINT}`;

  this.logger.log(
    'Calling TRAKCARE GetDoctorSlot API',
  );

  const requestPayload = {
    ...(payload.location_code?.trim()
      ? {
          location_code:
            payload.location_code,
        }
      : {}),

    ...(payload.doctor_code?.trim()
      ? {
          doctor_code:
            payload.doctor_code,
        }
      : {}),

    ...(payload.start_date?.trim()
      ? {
          start_date:
            payload.start_date,
        }
      : {}),

    ...(payload.end_date?.trim()
      ? {
          end_date:
            payload.end_date,
        }
      : {}),
  };

  this.logger.log(
    `TRAKCARE GetDoctorSlot Payload: ${JSON.stringify(
      requestPayload,
    )}`,
  );

  try {
    const response =
      await this.axiosClient.post<HisGetDoctorSlotResponseDto>(
        apiUrl,
        requestPayload,
      );

    this.logger.log(
      'Received response from TRAKCARE GetDoctorSlot API',
    );

    return response.data;
  } catch (error) {
    handleHisTransportError(
      error,
      this.logger,
      'HIS GetDoctorSlot',
    );
  }
}
  async createAppointment(
    payload: CreateAppointmentRequestDto,
  ): Promise<HisCreateAppointmentResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_APPOINTMENT_CREATE_APPOINTMENT_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE CreateAppointment API',
    );

    try {
      const response =
        await this.axiosClient.post<HisCreateAppointmentResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE CreateAppointment API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS CreateAppointment',
      );
    }
  }

  async cancelAppointment(
    payload: CancelAppointmentRequestDto,
  ): Promise<HisCancelAppointmentResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_APPOINTMENT_CANCEL_APPOINTMENT_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE CancelAppointment API',
    );

    try {
      const response =
        await this.axiosClient.put<HisCancelAppointmentResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE CancelAppointment API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS CancelAppointment',
      );
    }
  }
}