/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsArray,IsDateString,  IsOptional,IsString,MaxLength,ValidateNested,} from 'class-validator';
import { Type } from 'class-transformer';
import { PatientContactDto } from './patient-contact.dto';

export class SearchPatientDto {
  @ApiPropertyOptional({
    description: 'Hospital number',
    example: '53-034185',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  hn?: string;

  @ApiPropertyOptional({
    description: 'Patient given name',
    example: '',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  givenName?: string;

  @ApiPropertyOptional({
    description: 'Patient middle name',
    example: '',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  middleName?: string;

  @ApiPropertyOptional({
    description: 'Patient family name',
    example: '',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  familyName?: string;

  @ApiPropertyOptional({
    description: 'Alternative given name',
    example: '',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherGivenName?: string;

  @ApiPropertyOptional({
    description: 'Alternative middle name',
    example: '',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherMiddleName?: string;

  @ApiPropertyOptional({
    description: 'Alternative family name',
    example: '',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  otherFamilyName?: string;

@ApiPropertyOptional({
  description: 'Patient birth date',
  example: '1986-01-30',
  maxLength: 100,
})
@IsOptional()
@IsString()
@MaxLength(100)
birthDate?: string;

  @ApiPropertyOptional({
    description: 'National ID number',
    example: '',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  natID?: string;

  @ApiPropertyOptional({
    description: 'Passport number',
    example: '',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  passportNumber?: string;

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