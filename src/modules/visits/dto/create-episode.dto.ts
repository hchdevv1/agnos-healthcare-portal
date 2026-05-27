/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEpisodeDto {
  @ApiProperty({
    description: 'Hospital number',
    example: '52-056586',
  })
  @IsString()
  hn!: string;

  @ApiProperty({
    description: 'Appointment ID',
    example: '174||139424||1',
  })
  @IsString()
  appointment_id!: string;

  @ApiProperty({
    description: 'Doctor code',
    example: '4437',
  })
  @IsString()
  doctor_code!: string;

  @ApiProperty({
    description: 'Location code',
    example: '3110',
  })
  @IsString()
  location_code!: string;

  @ApiProperty({
    description: 'Episode note',
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;
}