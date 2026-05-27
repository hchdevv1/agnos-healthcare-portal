import { ApiProperty } from '@nestjs/swagger';

export class HisUpdateConsentErrorDto {
  @ApiProperty()
  field!: string;

  @ApiProperty()
  message!: string;
}

export class HisUpdateConsentResponseDto {
  @ApiProperty({
    example: 200,
  })
  StatusCode!: number;

  @ApiProperty({
    type: [HisUpdateConsentErrorDto],
    required: false,
  })
  errors?: HisUpdateConsentErrorDto[];
}