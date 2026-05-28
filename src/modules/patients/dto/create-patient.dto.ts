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

import { PatientEmergencyContactDto } from './patient-emergency-contact.dto';

export class CreatePatientDto {
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
    example: 'ทดสอบ5',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  givenName!: string;

  @ApiPropertyOptional({
    description: 'Patient middle name',
    example: 'โปรแกรม5',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  middleName?: string;

  @ApiProperty({
    description: 'Patient family name',
    example: 'ระบบคอม5',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  familyName!: string;



  @ApiPropertyOptional({
    description: 'Alternative given name',
    example: 'Test5',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherGivenName?: string;

  @ApiPropertyOptional({
    description: 'Alternative middle name',
    example: 'Program5',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherMiddleName?: string;

  @ApiPropertyOptional({
    description: 'Alternative family name',
    example: 'computersystem5',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherFamilyName?: string;

  @ApiPropertyOptional({
    description: 'National ID',
    example: '1111111111120',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  natID?: string;

  @ApiPropertyOptional({
    description: 'National ID expiry date',
    example: '',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  natIDExpireDate?: string;

  @ApiPropertyOptional({
    description: 'Passport number',
    example: 'AD1515321',
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
    example: '1996-02-21',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  birthDate?: string;

  @ApiPropertyOptional({
    description: 'Patient sex code',
    example: 'M',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  sexCode?: string;

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
    description: 'Nationality',
    example: '',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nationality?: string;

  @ApiPropertyOptional({
    description: 'Preferred language code',
    example: 'TH',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  preferredlanguageCode?: string;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: '',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  preferredLanguage?: string;

  @ApiPropertyOptional({
    description: 'Religion code',
    example: '1',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  religionCode?: string;

  @ApiPropertyOptional({
    description: 'Religion',
    example: 'พุทธ',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  religion?: string;

 

  @ApiPropertyOptional({
    description: 'Marital status code',
    example: '',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  maritalStatusCode?: string;

  @ApiPropertyOptional({
    description: 'Marital status',
    example: 'โสด',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  maritalStatus?: string;

  @ApiPropertyOptional({
    description: 'Address',
    example: '66/99',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({
    description: 'Area',
    example: 'คลองข่อย',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  area?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'ปากเกร็ด',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  city?: string;

  @ApiPropertyOptional({
    description: 'Province',
    example: 'นนทบุรี',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  province?: string;

  @ApiPropertyOptional({
    description: 'Zip code',
    example: '11120',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  zipcode?: string;

  

  @ApiPropertyOptional({
    description: 'Patient Category',
    example: 'VIP1',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  PatientCategory?: string;

  @ApiPropertyOptional({
    description: 'Patient contact information',
    type: [PatientContactDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatientContactDto)
  contact?: PatientContactDto[];

  @ApiPropertyOptional({
    description: 'Emergency contact information',
    type: [PatientEmergencyContactDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatientEmergencyContactDto)
  emergencyContact?: PatientEmergencyContactDto[];
}