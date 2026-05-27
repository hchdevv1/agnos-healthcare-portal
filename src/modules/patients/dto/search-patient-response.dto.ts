import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { PatientContactDto } from './patient-contact.dto';
import { PatientEmergencyContactDto } from './patient-emergency-contact.dto';
import { PatientAllergyDto } from './patient-allergy.dto';

export class PatientResponseDto {
  @ApiPropertyOptional({
    description: 'Hospital number',
    example: '53-034185',
  })
  hn?: string;

  @ApiPropertyOptional({
    description: 'Hospital number row identifier',
    example: 530100,
  })
  hnRowId?: number;

  @ApiPropertyOptional({
    description: 'Hospital number expiry flag',
    example: '',
  })
  hnExpiryFlag?: boolean;

  @ApiPropertyOptional({
    description: 'Anonymous patient flag',
    example: '',
  })
  hnAnonymousFlag?: boolean;

  @ApiPropertyOptional({
    description: 'Patient title/prefix',
    example: 'Miss.',
  })
  prefix?: string;

  @ApiPropertyOptional({
    description: 'Patient given name',
    example: 'แบบประเมิน',
  })
  givenName?: string;

  @ApiPropertyOptional({
    description: 'Patient middle name',
    example: '',
  })
  middleName?: string;

  @ApiPropertyOptional({
    description: 'Patient family name',
    example: 'ค่าใช้จ่าย',
  })
  familyName?: string;

  @ApiPropertyOptional({
    description: 'Alternative title/prefix',
    example: 'Miss.',
  })
  otherPrefix?: string;

  @ApiPropertyOptional({
    description: 'Alternative given name',
    example: 'Estimate Price',
  })
  otherGivenName?: string;

  @ApiPropertyOptional({
    description: 'Alternative middle name',
    example: '',
  })
  otherMiddleName?: string;

  @ApiPropertyOptional({
    description: 'Alternative family name',
    example: 'Huachiew Hospital',
  })
  otherFamilyName?: string;

  @ApiPropertyOptional({
    description: 'National ID number',
    example: '2103701628100',
  })
  natID?: string;

  @ApiPropertyOptional({
    description: 'National ID expiry date',
    example: '',
  })
  natIdExpireDate?: string;

  @ApiPropertyOptional({
    description: 'Passport number',
    example: '',
  })
  passportNumber?: string;

  @ApiPropertyOptional({
    description: 'Passport expiry date',
    example: '',
  })
  passportExpiryDate?: string;

  @ApiPropertyOptional({
    description: 'Patient birth date',
    example: '1986-01-30',
  })
  birthDate?: string;

  @ApiPropertyOptional({
    description: 'Sex code',
    example: 'F',
  })
  sexCode?: string;

  @ApiPropertyOptional({
    description: 'Sex description',
    example: 'Female',
  })
  sex?: string;

  @ApiPropertyOptional({
    description: 'Nationality code',
    example: '',
  })
  nationalityCode?: string;

  @ApiPropertyOptional({
    description: 'Nationality description',
    example: '',
  })
  nationality?: string;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: '',
  })
  preferredLanguage?: string;

  @ApiPropertyOptional({
    description: 'Preferred language code',
    example: '',
  })
  preferredlanguageCode?: string;

  @ApiPropertyOptional({
    description: 'Religion code',
    example: '',
  })
  religionCode?: string;

  @ApiPropertyOptional({
    description: 'Religion description',
    example: '',
  })
  religion?: string;

  @ApiPropertyOptional({
    description: 'Ethnicity code',
    example: '',
  })
  ethnicityCode?: string;

  @ApiPropertyOptional({
    description: 'Ethnicity description',
    example: '',
  })
  ethnicity?: string;

  @ApiPropertyOptional({
    description: 'Marital status code',
    example: '',
  })
  maritalStatusCode?: string;

  @ApiPropertyOptional({
    description: 'Marital status description',
    example: '',
  })
  maritalStatus?: string;

  @ApiPropertyOptional({
    description: 'Patient address',
    example: 'โรงพยาบาลหัวเฉียว (HCH)',
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'Area or district',
    example: 'คลองมหานาค',
  })
  area?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'ป้อมปราบศัตรูพ่าย',
  })
  city?: string;

  @ApiPropertyOptional({
    description: 'Province',
    example: 'กรุงเทพฯ',
  })
  province?: string;

  @ApiPropertyOptional({
    description: 'Zip code',
    example: '10100',
  })
  zipcode?: string;

  @ApiPropertyOptional({
    description: 'Country code',
    example: '',
  })
  countryCode?: string;

  @ApiPropertyOptional({
    description: 'Country description',
    example: '',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'Patient type',
    example: '',
  })
  patientType?: string;

  @ApiPropertyOptional({
    description: 'Patient contact information',
    type: [PatientContactDto],
  })
  contact?: PatientContactDto[];

  @ApiPropertyOptional({
    description: 'Emergency contact information',
    type: [PatientEmergencyContactDto],
  })
  emergencyContact?: PatientEmergencyContactDto[];

  @ApiPropertyOptional({
    description: 'Patient category',
    example: '',
  })
  category?: string;

  @ApiPropertyOptional({
    description: 'Additional message',
    example: '',
  })
  message?: string;

  @ApiPropertyOptional({
    description: 'Patient allergy information',
    type: [PatientAllergyDto],
  })
  allergy_list?: PatientAllergyDto[];
}

export class SearchPatientResponseDto {
  @ApiProperty({
    description: 'Patient search results',
    type: [PatientResponseDto],
  })
  patient!: PatientResponseDto[];
}