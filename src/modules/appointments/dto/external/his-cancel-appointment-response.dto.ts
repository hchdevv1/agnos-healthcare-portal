export class HisCancelAppointmentItemDto {
  AppointmentID?: string;

  appointment_date?: string;

  appointment_time?: string;

  appointment_status?: string;
}

export class HisCancelAppointmentErrorDto {
  field?: string;

  message?: string;
}

export class HisCancelAppointmentResponseDto {
  StatusCode?: number;

  hn?: string;

  Appointment?: HisCancelAppointmentItemDto;

  errors?: HisCancelAppointmentErrorDto[];
}