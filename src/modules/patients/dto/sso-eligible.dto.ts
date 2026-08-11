/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class SsoEligibleDto {
  @ApiProperty({
    description:
      'National ID number used to check NHSO eligibility',
    example: 'XXXXXXXXXXXXX',
    maxLength: 14,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  natID!: string;
}