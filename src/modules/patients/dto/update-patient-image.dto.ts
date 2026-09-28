import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePatientImageDto {
  @ApiProperty({
    example: '61-002403',
    description: 'Hospital number',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  hn?: string;

  @ApiProperty({
    example: '',
    description: 'Image upload timestamp',
  })
  @IsString()
  uploadTimeStamp?: string;

  @ApiProperty({
    description: 'Patient image in Base64 format',
    example: '/9j/4AAQSkZJRgABAQ...',
  })
  @IsString()
  @IsNotEmpty()
  image?: string;
}