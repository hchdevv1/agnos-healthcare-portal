/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class GetDoctorSlotRequestDto {
  @ApiPropertyOptional({
    example: '4144',
    description:
      'Location code',
  })
  @IsOptional()
  @IsString()
  location_code?: string;

  @ApiPropertyOptional({
    example: '10171',
    description:
      'Doctor code',
  })
  @IsOptional()
  @IsString()
  doctor_code?: string;

  @ApiPropertyOptional({
    example:
      '2026-06-05T00:00:00Z',
    description:
      'Start date',
  })
  @IsOptional()
  @IsString()
  start_date?: string;

  @ApiPropertyOptional({
    example:
      '2026-06-05T00:00:00Z',
    description:
      'End date',
  })
  @IsOptional()
  @IsString()
  end_date?: string;
}