/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentRequestDto {
  @ApiProperty({
    example: '174||139486',
  })
  @IsString()
  @IsNotEmpty()
  ApptASID!: string;

  @ApiProperty({
    example: '60-019471',
  })
  @IsString()
  @IsNotEmpty()
  hn!: string;

  @ApiPropertyOptional({
    example: '10171',
  })
  @IsOptional()
  @IsString()
  doctor_code?: string;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  @IsString()
  doctor_desc?: string;

  @ApiPropertyOptional({
    example: '4144',
  })
  @IsOptional()
  @IsString()
  location_code?: string;

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

  @ApiPropertyOptional({
    example: '1441',
  })
  @IsOptional()
  @IsString()
  service_code?: string;

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