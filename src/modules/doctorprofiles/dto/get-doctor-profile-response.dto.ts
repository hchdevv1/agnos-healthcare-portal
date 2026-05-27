import {
  ApiProperty,
} from '@nestjs/swagger';

import { DoctorProfileItemDto } from './doctor-profile-item.dto';

export class GetDoctorProfileResponseDto {
  @ApiProperty({
    example: 1,
  })
  Total?: number;

  @ApiProperty({
    type: [
      DoctorProfileItemDto,
    ],
  })
  DoctorList?: DoctorProfileItemDto[];
}