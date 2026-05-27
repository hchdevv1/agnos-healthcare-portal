/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentRequestDto {
  @ApiProperty({
    example: '2068||69832',
  })
  @IsString()
  @IsNotEmpty()
  ApptASID!: string;

  @ApiProperty({
    example: '64-044546',
  })
  @IsString()
  @IsNotEmpty()
  hn!: string;

  @ApiProperty({
    example: 6110189,
  })
  @IsOptional()
  @IsNumber()
  doctor_code?: number;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  @IsString()
  doctor_desc?: string;

  @ApiProperty({
    example: 3511,
  })
  @IsOptional()
  @IsNumber()
  location_code?: number;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  @IsString()
  location_desc?: string;

  @ApiPropertyOptional({
    example: '2026-05-26',
  })
  @IsOptional()
  @IsString()
  appointment_date?: string;

  @ApiPropertyOptional({
    example: '13:00:00',
  })
  @IsOptional()
  @IsString()
  appointment_time?: string;

  @ApiProperty({
    example: 1441,
  })
  @IsOptional()
  @IsNumber()
  service_code?: number;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  @IsString()
  service_desc?: string;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  @IsString()
  note?: string;
}