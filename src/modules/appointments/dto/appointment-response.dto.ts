import { ApiProperty } from '@nestjs/swagger';

export class AppointmentDto {
  @ApiProperty({
    example: '',
  })
  en?: string;

  @ApiProperty({
    example: '172||109135||1',
  })
  appointment_id?: string;

  @ApiProperty({
    example: '2026-05-25',
  })
  appointment_date?: string;

  @ApiProperty({
    example: '09:00',
  })
  appointment_time?: string;

  @ApiProperty({
    example: '3110',
  })
  location_code?: string;

  @ApiProperty({
    example: 'ทันตกรรม',
  })
  location_desc?: string;

  @ApiProperty({
    example: '2284',
  })
  doctor_code?: string;

  @ApiProperty({
    example: 'ทพญ. ณัชชา สันติวัฒนา',
  })
  doctor_desc?: string;

  @ApiProperty({
    example: '1933',
  })
  service_code?: string;

  @ApiProperty({
    example: 'นัดตรวจ 1 ปี',
  })
  service_desc?: string;

  @ApiProperty({
    example: 'Booked',
  })
  appointment_status?: string;

  @ApiProperty({
    example: '',
  })
  note?: string;

@ApiProperty({
    example: true,
  })
  overbook?: boolean;
}

export class GetAppointmentResponseDto {
  @ApiProperty({
    example: '62-031130',
  })
  hn?: string;

  @ApiProperty({
    type: AppointmentDto,
  })
  Appointments?: AppointmentDto;
}