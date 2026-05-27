import { ApiProperty } from '@nestjs/swagger';

export class UpdateConsentErrorDto {
  @ApiProperty({
    example: 'consentKey',
  })
  field!: string;

  @ApiProperty({
    example: 'consentKey is invalid',
  })
  message!: string;
}

export class UpdateConsentResponseDto {
  @ApiProperty({
    example: 200,
  })
  StatusCode!: number;

  @ApiProperty({
    type: [UpdateConsentErrorDto],
    required: false,
  })
  errors?: UpdateConsentErrorDto[];
}