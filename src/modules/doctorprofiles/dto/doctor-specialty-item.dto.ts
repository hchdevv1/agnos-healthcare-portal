import {
  ApiProperty,
} from '@nestjs/swagger';

export class DoctorSpecialtyItemDto {
  @ApiProperty({
    example: '1',
  })
  DoctorSpecialtyCode?: string;

  @ApiProperty({
    example: 'กุมารแพทย์',
  })
  DoctorSpecialtyDesc?: string;

  @ApiProperty({
    example: '',
  })
  DoctorSubSpecialtyCode?: string;

  @ApiProperty({
    example: '',
  })
  DoctorSubSpecialtyDesc?: string;
}