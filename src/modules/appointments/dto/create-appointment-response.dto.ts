import { ApiProperty } from '@nestjs/swagger';

export class AppointmentResultItemDto {
  @ApiProperty({
    example: '2068||69832||5',
  })
  appointment_id?: string;

  @ApiProperty({
    example: '10171',
  })
  doctor_code?: string;

  @ApiProperty({
    example:
      'นพ. วีรเทพ รัตนสุวรรณศรี',
  })
  doctor_desc?: string;

  @ApiProperty({
    example: '4144',
  })
  location_code?: string;

  @ApiProperty({
    example: 'อายุรกรรม',
  })
  location_desc?: string;

  @ApiProperty({
    example: '2026-05-26',
  })
  appointment_date?: string;

  @ApiProperty({
    example: '13:00:00',
  })
  appointment_time?: string;

  @ApiProperty({
    example: '1441',
  })
  service_code?: string;

  @ApiProperty({
    example: 'Patient Walk-in',
  })
  service_desc?: string;

  @ApiProperty({
    example: '',
  })
  note?: string;
}

export class CreateAppointmentResponseDto {
  @ApiProperty({
    example: '64-044546',
  })
  hn?: string;

  @ApiProperty({
    type: [AppointmentResultItemDto],
  })
  appointment?: AppointmentResultItemDto[];
}