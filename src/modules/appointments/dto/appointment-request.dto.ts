/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAppointmentRequestDto {
  @ApiPropertyOptional({
    example: '62-031130',
    description: 'Hospital number',
  })
  @IsOptional()
  @IsString()
  hn?: string;

  @ApiProperty({
    example: '2026-05-25',
    description: 'Appointment start date',
  })
  @IsDateString()
  date_from?: string;

  @ApiProperty({
    example: '2026-05-25',
    description: 'Appointment end date',
  })
  @IsDateString()
  date_to?: string;

  @ApiPropertyOptional({
    example: '3110',
    description: 'Location code',
  })
  @IsOptional()
  @IsString()
  location_code?: string;

  @ApiPropertyOptional({
    example: '2284',
    description: 'Doctor resource code',
  })
  @IsOptional()
  @IsString()
  doctor_code?: string;
}