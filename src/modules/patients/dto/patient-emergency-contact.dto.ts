/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class PatientEmergencyContactDto {
  @ApiPropertyOptional({
    description:
      'Emergency contact first name',
    example: 'สุรพัฒน์',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  emergencyContactFirstName?: string;

  @ApiPropertyOptional({
    description:
      'Emergency contact last name',
    example: 'สุขธุวนันท์',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  emergencyContactLastName?: string;

  @ApiPropertyOptional({
    description:
      'Emergency contact relationship',
    example: 'ลุง',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  emergencyContactRelationship?: string;

  @ApiPropertyOptional({
    description:
      'Emergency contact row identifier',
    example: '01',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  emergencyContactRowID?: string;

  @ApiPropertyOptional({
    description:
      'Emergency contact phone number',
    example: '061-626-2966',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  emergencyPhoneNumber?: string;
}