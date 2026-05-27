import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

class CreatePatientErrorDto {
  @ApiProperty({
    description: 'Error field name',
    example: 'natID',
  })
  field!: string;

  @ApiProperty({
    description: 'Error message',
    example: 'natID is required',
  })
  message!: string;
}

export class CreatePatientResponseDto {
  @ApiProperty({
    description: 'External HIS response status code',
    example: 200,
  })
  StatusCode!: number;

  @ApiPropertyOptional({
    description: 'Generated hospital number',
    example: '69-000917',
  })
  HN?: string;

  @ApiPropertyOptional({
    description: 'External HIS validation errors',
    type: [CreatePatientErrorDto],
  })
  errors?: CreatePatientErrorDto[];
}