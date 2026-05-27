import { ApiProperty } from '@nestjs/swagger';

export class HisVisitListItemDto {
  @ApiProperty({
    example: '60-019471',
  })
  hn!: string;

  @ApiProperty({
    example: '',
    nullable: true,
  })
  en!: string;

  @ApiProperty({
    example: '13773002',
  })
  en_rowID!: string;

  @ApiProperty({
    example: '2026-05-27',
  })
  visit_date!: string;

  @ApiProperty({
    example: '13773002',
  })
  visit_rowID!: string;

  @ApiProperty({
    example: 'Pre-Admission',
  })
  en_status!: string;

  @ApiProperty({
    example: 'Booked',
  })
  appointment_status!: string;

  @ApiProperty({
    example: '172||109165||2',
  })
  appointment_id!: string;

  @ApiProperty({
    example: '3110',
  })
  location_code!: string;

  @ApiProperty({
    example: 'ทันตกรรม',
  })
  location_description!: string;

  @ApiProperty({
    example: '2284',
  })
  doctor_code!: string;

  @ApiProperty({
    example: 'ทพญ. ณัชชา สันติวัฒนา',
  })
  doctor_description!: string;

  @ApiProperty({
    example: '1441',
  })
  service_code!: string;

  @ApiProperty({
    example: 'Patient Walk-in',
  })
  service_desc!: string;

  @ApiProperty({
    example: false,
  })
  seen_by_doctor!: boolean;

  @ApiProperty({
    example: false,
  })
  med_discharge!: boolean;

  @ApiProperty({
    example: false,
  })
  vitalSign_status!: boolean;
}

export class HisVisitListErrorDto {
  @ApiProperty()
  field!: string;

  @ApiProperty()
  message!: string;
}

export class HisVisitListResponseDto {
  @ApiProperty({
    example: 200,
    required: false,
  })
  StatusCode?: number;

  @ApiProperty({
    type: [HisVisitListItemDto],
  })
  visit_list!: HisVisitListItemDto[];

  @ApiProperty({
    type: [HisVisitListErrorDto],
    required: false,
  })
  errors?: HisVisitListErrorDto[];
}