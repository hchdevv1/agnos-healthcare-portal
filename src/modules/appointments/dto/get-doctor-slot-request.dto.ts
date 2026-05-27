/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetDoctorSlotRequestDto {
  @ApiPropertyOptional({
    example: '4144',
    description: 'Location code',
  })
  @IsOptional()
  @IsString()
  location_code?: string;

  @ApiProperty({
    example: '10171',
    description: 'Doctor code',
  })
  @IsString()
  doctor_code?: string;

  @ApiProperty({
    example: '2026-05-22',
    description: 'Start date',
  })
  @IsString()
  start_date?: string;

  @ApiProperty({
    example: '2026-05-25',
    description: 'End date',
  })
  @IsString()
  end_date?: string;
}