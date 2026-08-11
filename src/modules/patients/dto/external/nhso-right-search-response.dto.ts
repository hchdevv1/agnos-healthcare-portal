import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class NhsoSexDto {
  @ApiPropertyOptional({
    description: 'Gender code',
    example: '2',
  })
  id?: string;

  @ApiPropertyOptional({
    description: 'Gender name',
    example: 'หญิง',
  })
  name?: string;
}

export class NhsoBirthDateNewDto {
  @ApiPropertyOptional({
    description: 'Birth year',
    example: 1985,
  })
  year?: number;

  @ApiPropertyOptional({
    description: 'Birth month',
    example: 11,
  })
  month?: number;

  @ApiPropertyOptional({
    description: 'Birth day',
    example: 15,
  })
  day?: number;
}

export class NhsoNationDto {
  @ApiPropertyOptional({
    description: 'Nationality code',
    example: '099',
  })
  id?: string;
}

export class NhsoFundHospitalDto {
  @ApiPropertyOptional({
    description: 'Hospital code',
    example: '11750',
  })
  hcode?: string;

  @ApiPropertyOptional({
    description: 'Hospital name',
    example:
      'รพ.หัวเฉียวโรงพยาบาลทั่วไปขนาดใหญ่',
  })
  hname?: string;
}

export class NhsoFundTypeDto {
  @ApiPropertyOptional({
    description: 'Fund type',
    example: 'Y',
  })
  fundType?: string;

  @ApiPropertyOptional({
    description: 'Main insurance scheme',
  })
  mainInscl?: {
    id?: string;
    name?: string;
  };

  @ApiPropertyOptional({
    description: 'Sub insurance scheme',
  })
  subInscl?: {
    id?: string;
    name?: string;
  };

  @ApiPropertyOptional({
    description: 'Main hospital',
    type: NhsoFundHospitalDto,
  })
  hospMain?: NhsoFundHospitalDto;

  @ApiPropertyOptional({
    description: 'SSS hospital',
    type: NhsoFundHospitalDto,
  })
  hospSss?: NhsoFundHospitalDto;

  @ApiPropertyOptional({
    description: 'Purchase province',
  })
  purchaseProvince?: {
    id?: string;
    name?: string;
  };

  @ApiPropertyOptional({
    description: 'Relationship',
    example: 'สิทธิตนเอง',
  })
  relation?: string;

  @ApiPropertyOptional({
    description: 'Transaction date',
    example: 1111111111111,
  })
  transDate?: number;

  @ApiPropertyOptional({
    description: 'Start date time',
    example: 1111111111111,
  })
  startDateTime?: number;

  @ApiPropertyOptional({
    description: 'Main outpatient hospital',
  })
  hospMainOp?: NhsoFundHospitalDto;

  @ApiPropertyOptional({
    description: 'Sub hospital',
  })
  hospSub?: NhsoFundHospitalDto;
}

export class NhsoRightSearchResponseDto {
  @ApiPropertyOptional({
    description: 'Check date timestamp',
    example: 1111111111111,
  })
  checkDate?: number;

  @ApiPropertyOptional({
    description: 'National ID',
    example: 'XXXXXXXXXXXXX',
  })
  pid?: string;

  @ApiPropertyOptional({
    description: 'Nationality',
    type: NhsoNationDto,
  })
  nation?: NhsoNationDto;

  @ApiPropertyOptional({
    description: 'Patient gender',
    type: NhsoSexDto,
  })
  sex?: NhsoSexDto;

  @ApiPropertyOptional({
    description: 'Insurance funds',
    type: [NhsoFundTypeDto],
  })
  funds?: NhsoFundTypeDto[];

  @ApiPropertyOptional({
    description: 'Patient title',
    example: 'XXXXXXX',
  })
  tname?: string;

  @ApiPropertyOptional({
    description: 'Patient first name',
    example: 'XXXXXXXX',
  })
  fname?: string;

  @ApiPropertyOptional({
    description: 'Patient last name',
    example: 'XXXXXXXXX',
  })
  lname?: string;

  @ApiPropertyOptional({
    description: 'Patient birth date',
    type: NhsoBirthDateNewDto,
  })
  birthDateNew?: NhsoBirthDateNewDto;

  @ApiPropertyOptional({
    description: 'Patient birth date in Thai language',
    example: '15 พฤศจิกายน 2528',
  })
  birthDate?: string;
}