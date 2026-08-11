import {
  ApiProperty,
} from '@nestjs/swagger';

export class SsoEligiblePatientDto {
  @ApiProperty({
    description:
      'Social Security / NHSO patient identification number',
    example: 'XXXXXXXXXXXXX',
  })
  ssoid!: string;

  @ApiProperty({
    description: 'Patient title',
    example: 'นางสาว',
  })
  title!: string;

  @ApiProperty({
    description: 'Patient first name',
    example: 'อาทิตยา',
  })
  firstname!: string;

  @ApiProperty({
    description: 'Patient last name',
    example: 'XXXXXXXXX',
  })
  lastname!: string;

  @ApiProperty({
    description: 'Patient full name',
    example:
      'XXXXXX XXXXXXXX XXXXXXX',
  })
  FullName!: string;

 @ApiProperty({
  description:
    'Patient date of birth in ISO format (YYYY-MM-DD)',
  example: '1985-07-15',
})
  DOB!: string;

  @ApiProperty({
    description: 'Patient gender',
    example: 'หญิง',
  })
  Gender!: string;
}

export class SsoEligibleResponseDto {
  @ApiProperty({
    description:
      'Whether the patient is eligible based on hospital code 11750',
    example: true,
  })
  eligible!: boolean;

  @ApiProperty({
    description: 'Patient information',
    type: SsoEligiblePatientDto,
  })
  patient!: SsoEligiblePatientDto;
}