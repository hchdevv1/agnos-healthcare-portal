import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AppointmentsService } from './appointments.service';

import { GetAppointmentRequestDto } from './dto/appointment-request.dto';
import { GetAppointmentResponseDto } from './dto/appointment-response.dto';
import { GetDoctorSlotRequestDto } from './dto/get-doctor-slot-request.dto';
import { GetDoctorSlotResponseDto } from './dto/get-doctor-slot-response.dto';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { CreateAppointmentResponseDto } from './dto/create-appointment-response.dto';


import { CancelAppointmentRequestDto } from './dto/cancel-appointment-request.dto';
import { CancelAppointmentResponseDto } from './dto/cancel-appointment-response.dto';
@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Post('get-appointment')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get patient appointments',
  })
  @ApiOkResponse({
    description:
      'Appointments retrieved successfully',
    type: GetAppointmentResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request payload',
  })
  async getAppointment(
    @Body()
    dto: GetAppointmentRequestDto,
  ): Promise<GetAppointmentResponseDto[]> {
    return this.appointmentsService.getAppointment(
      dto,
    );
  }

  @Post('get-doctor-slot')
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Get doctor appointment slots',
})
@ApiOkResponse({
  description:
    'Doctor slots retrieved successfully',
  type: GetDoctorSlotResponseDto,
})
@ApiBadRequestResponse({
  description: 'Invalid request payload',
})
async getDoctorSlot(
  @Body()
  dto: GetDoctorSlotRequestDto,
): Promise<GetDoctorSlotResponseDto> {
  return this.appointmentsService.getDoctorSlot(
    dto,
  );
}
@Post('create-appointment')
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Create appointment',
})
@ApiOkResponse({
  description:
    'Appointment created successfully',
  type: CreateAppointmentResponseDto,
})
@ApiBadRequestResponse({
  description: 'Invalid request payload',
})
async createAppointment(
  @Body()
  dto: CreateAppointmentRequestDto,
): Promise<CreateAppointmentResponseDto> {
  return this.appointmentsService.createAppointment(
    dto,
  );
}
@Put('cancel-appointment')
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Cancel appointment',
})
@ApiOkResponse({
  description:
    'Appointment cancelled successfully',
  type: CancelAppointmentResponseDto,
})
@ApiBadRequestResponse({
  description: 'Invalid request payload',
})
async cancelAppointment(
  @Body()
  dto: CancelAppointmentRequestDto,
): Promise<CancelAppointmentResponseDto> {
  return this.appointmentsService.cancelAppointment(
    dto,
  );
}
}