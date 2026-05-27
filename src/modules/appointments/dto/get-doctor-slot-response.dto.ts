import { ApiProperty } from '@nestjs/swagger';

export class DoctorSlotItemDto {
  @ApiProperty({
    example: '2068||69764',
  })
  id?: string;

  @ApiProperty({
    example: '2026-05-22',
  })
  date?: string;

  @ApiProperty({
    example: '13:00',
  })
  startTime?: string;

  @ApiProperty({
    example: '13:15',
  })
  endTime?: string;

  @ApiProperty({
    example: '2',
  })
  numberOfAvailable?: number;

  @ApiProperty({
    example: 'Available',
  })
  status?: string;
}

export class DoctorInfoDto {
  @ApiProperty({
    example: '10171',
  })
  code?: string;

  @ApiProperty({
    example: 'นพ. วีรเทพ รัตนสุวรรณศรี',
  })
  description?: string;

  @ApiProperty({
    example: 1,
  })
  onlineAppointment?: boolean;
}

export class LocationInfoDto {
  @ApiProperty({
    example: '4144',
  })
  code?: string;

  @ApiProperty({
    example: 'อายุรกรรม',
  })
  description?: string;

  @ApiProperty({
    example: 1,
  })
  onlineAppointment?: boolean;
}

export class ScheduleItemDto {
  @ApiProperty({
    type: DoctorInfoDto,
  })
  doctor?: DoctorInfoDto;

  @ApiProperty({
    type: LocationInfoDto,
  })
  location?: LocationInfoDto;

  @ApiProperty({
    type: [DoctorSlotItemDto],
  })
  slots?: DoctorSlotItemDto[];
}

export class SchedulesDto {
  @ApiProperty({
    type: [ScheduleItemDto],
  })
  Schedule?: ScheduleItemDto[];
}

export class GetDoctorSlotResponseDto {
  @ApiProperty({
    type: SchedulesDto,
  })
  Schedules?: SchedulesDto;
}