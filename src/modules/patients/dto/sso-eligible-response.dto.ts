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
export class SsoEligibleHuachiewEmployeeDto {
  @ApiProperty({
    description: 'Huachiew employee code',
    example: '6110189',
  })
  empcode!: string;

  @ApiProperty({
    description: 'Employee position',
    example: 'เจ้าหน้าที่พัฒนาระบบคอมพิวเตอร์สารสนเทศ',
  })
  position!: string;

  @ApiProperty({
    description: 'Employee location code',
    example: '4110',
  })
  loccode!: string;

  @ApiProperty({
    description: 'Employee location name',
    example: 'ศูนย์คอมพิวเตอร์และสารสนเทศ',
  })
  locname!: string;

  @ApiProperty({
    description: 'Employee start date',
    example: '2018-08-01',
  })
  startdate!: string;

  @ApiProperty({
    description: 'Whether the patient is a Huachiew employee',
    example: true,
  })
  empflag!: boolean;
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
 @ApiProperty({
    description: 'Huachiew employee information',
    type: SsoEligibleHuachiewEmployeeDto,
    nullable: true,
  })
  huachiewEmployee!: SsoEligibleHuachiewEmployeeDto | null;


}