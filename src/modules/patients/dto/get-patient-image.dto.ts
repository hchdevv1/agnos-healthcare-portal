import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetPatientImageDto {
  @ApiProperty({
    description: 'Hospital number',
    example: '60-019471',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  hn?: string;
}