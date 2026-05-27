/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { PatientContactDto } from './patient-contact.dto';

export class UpdatePatientDto {
  @ApiProperty({
    description: 'Hospital number',
    example: '69-000924',
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  hn!: string;

  @ApiProperty({
    description: 'Patient prefix/title',
    example: 'นาย',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  prefix!: string;

  @ApiProperty({
    description: 'Patient given name',
    example: 'ระบบคอม777',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  givenName!: string;

  @ApiProperty({
    description: 'Patient family name',
    example: 'ระบบคอม7778',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  familyName!: string;

  @ApiPropertyOptional({
    description: 'Alternative given name',
    example: 'Sitthisak',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherGivenName?: string;

  @ApiPropertyOptional({
    description: 'Alternative family name',
    example: 'Suktuwanan',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherFamilyName?: string;

  @ApiPropertyOptional({
    description: 'National ID',
    example: '1103701628359',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  natID?: string;

  @ApiPropertyOptional({
    description: 'Passport number',
    example: 'AD22036478',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  passportNumber?: string;

  @ApiPropertyOptional({
    description: 'Passport expiry date',
    example: '',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  passportExpiryDate?: string;

  @ApiPropertyOptional({
    description: 'Birth date',
    example: '1995-02-02',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  birthDate?: string;

  @ApiPropertyOptional({
    description: 'Patient sex',
    example: 'Male',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  sex?: string;

  @ApiPropertyOptional({
    description: 'Nationality code',
    example: 'TH',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  nationalityCode?: string;

  @ApiPropertyOptional({
    description: 'Patient contact information',
    type: [PatientContactDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatientContactDto)
  contact?: PatientContactDto[];
}