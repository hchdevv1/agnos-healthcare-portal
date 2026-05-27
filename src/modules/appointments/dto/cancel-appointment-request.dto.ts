/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional
} from 'class-validator';

export class CancelAppointmentRequestDto {
  @ApiProperty({
    example: '2068||69849||1',
  })
  @IsString()
  @IsNotEmpty()
  appointment_id!: string;

  @ApiProperty({
    example: '64-044546',
  })
  @IsString()
  @IsNotEmpty()
  hn!: string;
}