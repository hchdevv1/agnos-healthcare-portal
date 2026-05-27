/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  BadGatewayException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { handleHisBusinessResponse } from '../../common/utils/his-response-handler';

import { AppointmentsRepository } from './repositories/appointments.repository';

import { GetAppointmentRequestDto } from './dto/appointment-request.dto';

import { GetAppointmentResponseDto } from './dto/appointment-response.dto';

import { HisGetAppointmentResponseDto } from './dto/external/his-get-appointment-response.dto';

import { GetDoctorSlotRequestDto } from './dto/get-doctor-slot-request.dto';

import {
  GetDoctorSlotResponseDto,
  ScheduleItemDto,
} from './dto/get-doctor-slot-response.dto';

import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';

import {
  AppointmentResultItemDto,
  CreateAppointmentResponseDto,
} from './dto/create-appointment-response.dto';

import {
  HisCreateAppointmentItemDto,
} from './dto/external/his-create-appointment-response.dto';

import { CancelAppointmentRequestDto } from './dto/cancel-appointment-request.dto';

import {

  CancelAppointmentResponseDto,
} from './dto/cancel-appointment-response.dto';

import {
  HisCancelAppointmentErrorDto,HisCancelAppointmentItemDto,HisCancelAppointmentResponseDto
} from './dto/external/his-cancel-appointment-response.dto';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(
    AppointmentsService.name,
  );

  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async getAppointment(
    dto: GetAppointmentRequestDto,
  ): Promise<GetAppointmentResponseDto[]> {
    this.logger.log(
      `Fetching appointments for HN ${dto.hn ?? 'ALL'}`,
    );

    const response: any =
      await this.appointmentsRepository.getAppointment(
        dto,
      );

    handleHisBusinessResponse(
      response,
      this.logger,
      'TRAKCARE GetAppointment',
    );

    if (!Array.isArray(response)) {
      this.logger.error(
        `TRAKCARE GetAppointment returned malformed response: ${JSON.stringify(
          response,
        )}`,
      );

      throw new BadGatewayException({
        message:
          'External appointment service returned invalid response',
      });
    }

    return response.map(
      (
        item: HisGetAppointmentResponseDto,
      ): GetAppointmentResponseDto => {
        if (!item.Appointments) {
          this.logger.error(
            `TRAKCARE GetAppointment missing Appointments object for HN ${item.hn}`,
          );

          throw new BadGatewayException({
            message:
              'External appointment service returned incomplete response',
          });
        }

        return {
          hn: item.hn,

          Appointments: {
            en: item.Appointments.en,

            appointment_id:
              item.Appointments.appointment_id,

            appointment_date:
              item.Appointments.appointment_date,

            appointment_time:
              item.Appointments.appointment_time,

            location_code:
              item.Appointments.location_code,

            location_desc:
              item.Appointments.location_desc,

            doctor_code:
              item.Appointments.doctor_code,

            doctor_desc:
              item.Appointments.doctor_desc,

            service_code:
              item.Appointments.service_code,

            service_desc:
              item.Appointments.service_desc,

            appointment_status:
              item.Appointments.appointment_status,

            note: item.Appointments.note,
          },
        };
      },
    );
  }
  async getDoctorSlot(
    dto: GetDoctorSlotRequestDto,
  ): Promise<GetDoctorSlotResponseDto> {
    this.logger.log(
      `Fetching doctor slots for doctor ${dto.doctor_code}`,
    );

    const response: any =
      await this.appointmentsRepository.getDoctorSlot(
        dto,
      );

    handleHisBusinessResponse(
      response,
      this.logger,
      'TRAKCARE GetDoctorSlot',
    );

    /*
     * Support both:
     * - PascalCase
     * - camelCase
     * payloads from HIS
     */
    const schedulesPayload =
      response.Result?.Schedules ??
      response.Result?.schedules ??
      response.Schedules ??
      response.schedules;

    if (!schedulesPayload) {
      this.logger.error(
        `TRAKCARE GetDoctorSlot returned malformed response: ${JSON.stringify(
          response,
        )}`,
      );

      throw new BadGatewayException({
        message:
          'External doctor slot service returned invalid response',
      });
    }

    const rawSchedules =
      schedulesPayload.Schedule ??
      schedulesPayload.schedule ??
      [];

    const scheduleList = Array.isArray(
      rawSchedules,
    )
      ? rawSchedules
      : [rawSchedules];

    const schedules: ScheduleItemDto[] =
      scheduleList.map(
        (schedule: any) => ({
          doctor: {
            code:
              schedule.Doctor?.Code ??
              schedule.doctor?.code ??
              '',

            description:
              schedule.Doctor?.Description ??
              schedule.doctor?.description ??
              '',

            onlineAppointment:
              schedule.Doctor
                ?.OnlineAppointment ??
              schedule.doctor
                ?.onlineAppointment ??
              0,
          },

          location: {
            code:
              schedule.Location?.Code ??
              schedule.location?.code ??
              '',

            description:
              schedule.Location?.Description ??
              schedule.location?.description ??
              '',

            onlineAppointment:
              schedule.Location
                ?.OnlineAppointment ??
              schedule.location
                ?.onlineAppointment ??
              0,
          },

          slots: (
            schedule.Slots?.Slot ??
            schedule.slots?.slot ??
            []
          ).map((slot: any) => ({
            id:
              slot.ID ??
              slot.id ??
              '',

            date:
              slot.Date ??
              slot.date ??
              '',

            startTime:
              slot.StartTime ??
              slot.startTime ??
              '',

            endTime:
              slot.EndTime ??
              slot.endTime ??
              '',

            numberOfAvailable:
              slot.NumberOfAvailable ??
              slot.numberOfAvailable ??
              '',

            status:
              slot.Status ??
              slot.status ??
              '',
          })),
        }),
      );

    return {
      Schedules: {
        Schedule: schedules,
      },
    };
  }
async createAppointment(
  dto: CreateAppointmentRequestDto,
): Promise<CreateAppointmentResponseDto> {
  this.logger.log(
    `Creating appointment for HN ${dto.hn}`,
  );

  const response: any =
    await this.appointmentsRepository.createAppointment(
      dto,
    );

  handleHisBusinessResponse(
    response,
    this.logger,
    'TRAKCARE CreateAppointment',
  );

  if (
    !response ||
    !response.hn ||
    !response.appointment
  ) {
    this.logger.error(
      `TRAKCARE CreateAppointment returned malformed response: ${JSON.stringify(
        response,
      )}`,
    );

    throw new BadGatewayException({
      message:
        'External create appointment service returned invalid response',
    });
  }

  const rawAppointments =
    response.appointment;

  const appointmentList = Array.isArray(
    rawAppointments,
  )
    ? rawAppointments
    : [rawAppointments];

  const appointments: AppointmentResultItemDto[] =
  appointmentList.map(
    (
      item: HisCreateAppointmentItemDto,
    ) => ({
      appointment_id:
        item.appointmentid ??
        (item as any).appointment_id ??
        '',

      doctor_code:
        item.doctorcode ??
        (item as any).doctor_code ??
        '',

      doctor_desc:
        item.doctorname ??
        (item as any).doctor_desc ??
        '',

      location_code:
        item.location_code ??
        '',

      location_desc:
        item.location_name ??
        (item as any).location_desc ??
        '',

      appointment_date:
        item.appointment_date ??
        '',

      appointment_time:
        item.appointment_time ??
        '',

      service_code:
        item.service_code ??
        '',

      service_desc:
        item.service_desc ??
        '',

      note:
        item.note ??
        '',
    }),
  );

  return {
    hn: response.hn,
    appointment: appointments,
  };
}

  async cancelAppointment(
    dto: CancelAppointmentRequestDto,
  ): Promise<CancelAppointmentResponseDto> {
    this.logger.log(
      `Cancelling appointment ${dto.appointment_id} for HN ${dto.hn}`,
    );

    const response: any =
      await this.appointmentsRepository.cancelAppointment(
        dto,
      );

    handleHisBusinessResponse(
      response,
      this.logger,
      'TRAKCARE CancelAppointment',
    );

    if (
      !response ||
      !response.hn ||
      !response.Appointment
    ) {
      this.logger.error(
        `TRAKCARE CancelAppointment returned malformed response: ${JSON.stringify(
          response,
        )}`,
      );

      throw new BadGatewayException({
        message:
          'External cancel appointment service returned invalid response',
      });
    }

    return {
      hn: response.hn,

      appointment: {
        appointmentId:
          response.Appointment
            ?.AppointmentID ?? '',

        appointmentDate:
          response.Appointment
            ?.appointment_date ?? '',

        appointmentTime:
          response.Appointment
            ?.appointment_time ?? '',

        appointmentStatus:
          response.Appointment
            ?.appointment_status ?? '',
      },
    };
  }
}