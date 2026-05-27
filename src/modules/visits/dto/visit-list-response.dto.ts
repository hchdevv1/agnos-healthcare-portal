import { ApiProperty } from '@nestjs/swagger';

export class VisitItemDto {
  @ApiProperty()
  hn!: string;

  @ApiProperty()
  en!: string;

  @ApiProperty()
  en_rowID!: string;

  @ApiProperty()
  visit_date!: string;

  @ApiProperty()
  visit_rowID!: string;

  @ApiProperty()
  en_status!: string;

  @ApiProperty()
  appointment_status!: string;

  @ApiProperty()
  appointment_id!: string;

  @ApiProperty()
  location_code!: string;

  @ApiProperty()
  location_description!: string;

  @ApiProperty()
  doctor_code!: string;

  @ApiProperty()
  doctor_description!: string;

  @ApiProperty()
  service_code!: string;

  @ApiProperty()
  service_desc!: string;

  @ApiProperty()
  seen_by_doctor!: boolean;

  @ApiProperty()
  med_discharge!: boolean;

  @ApiProperty()
  vitalSign_status!: boolean;
}

export class VisitListResponseDto {
  @ApiProperty({
    type: [VisitItemDto],
  })
  visit_list!: VisitItemDto[];
}