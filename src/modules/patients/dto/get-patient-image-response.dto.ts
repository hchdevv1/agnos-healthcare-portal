import { ApiProperty } from '@nestjs/swagger';

export class GetPatientImageResponseDto {
  @ApiProperty({
    example: '60-019471',
  })
  hn?: string;

  @ApiProperty({
    example: '2023-07-14T09:53:07',
  })
  uploadTimeStamp?: string;

  @ApiProperty({
    description: 'Patient image in Base64 format',
    example: '/9j/4AAQSkZJRgABAQ...',
  })
  image?: string;
}