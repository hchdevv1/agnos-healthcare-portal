export class HisAppointmentDetailDto {
  en?: string;

  appointment_id?: string;

  appointment_date?: string;

  appointment_time?: string;

  location_code?: string;

  location_desc?: string;

  doctor_code?: string;

  doctor_desc?: string;

  service_code?: string;

  service_desc?: string;

  appointment_status?: string;

  note?: string;
}

export class HisGetAppointmentResponseDto {
  hn?: string;

  Appointments?: HisAppointmentDetailDto;
}