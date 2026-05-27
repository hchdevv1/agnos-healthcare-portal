export class HisCreateAppointmentItemDto {
  episodeid?: string;

  appointmentid?: string;

  doctorcode?: string;

  doctorname?: string;

  location_code?: string;

  location_name?: string;

  appointment_date?: string;

  appointment_time?: string;

  service_code?: string;

  service_desc?: string;

  note?: string;
}

export class HisCreateAppointmentResponseDto {
  hn?: string;

  appointment?:
    | HisCreateAppointmentItemDto[]
    | HisCreateAppointmentItemDto;
}