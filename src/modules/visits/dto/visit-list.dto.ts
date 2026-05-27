/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class VisitListDto {
  @ApiProperty({
    description: 'Hospital number',
    example: '64-044546',
    required: false,
  })
  @IsOptional()
  @IsString()
  hn?: string;

  @ApiProperty({
    description: 'Encounter number',
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  en?: string;

  @ApiProperty({
    description: 'Location code',
    example: '3110',
    required: false,
  })
  @IsOptional()
  @IsString()
  location_code?: string;

  @ApiProperty({
    description: 'Visit date from',
    example: '2026-05-01',
    required: false,
  })
  @IsOptional()
  @IsString()
  date_from?: string;

  @ApiProperty({
    description: 'Visit date to',
    example: '2026-05-31',
    required: false,
  })
  @IsOptional()
  @IsString()
  date_to?: string;
}