/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import {
  Type,
} from 'class-transformer';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class DoctorProfileQueryDto {
  @ApiPropertyOptional({
    example: '24843',
    description:
      'Doctor SAP code',
  })
  @IsOptional()
  @IsString()
  SAPcode?: string;

  @ApiPropertyOptional({
    example: '24843',
    description:
      'Doctor code at location',
  })
  @IsOptional()
  @IsString()
  DoctorCodeAtLocation?: string;

  @ApiPropertyOptional({
    example: '4159',
    description:
      'Location code',
  })
  @IsOptional()
  @IsString()
  LocationCode?: string;

  @ApiPropertyOptional({
    example: 0,
    description:
      'Pagination offset',
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  Offset?: number = 0;

  @ApiPropertyOptional({
    example: 100,
    description:
      'Pagination limit',
    default: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  Limit?: number = 20;
}