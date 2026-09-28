import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientImageResponseDto {
  @ApiProperty({
    example: 200,
  })
  statuscode?: number;
}