import {
  ApiProperty,
} from '@nestjs/swagger';

import { DoctorSpecialtyItemDto } from './doctor-specialty-item.dto';

export class DoctorProfileItemDto {
  @ApiProperty({
    example: 24843,
  })
  doctor_code?: number;

  @ApiProperty({
    example: 'พญ.',
  })
  DoctorTitle?: string;

  @ApiProperty({
    example:
      'วิไลรัตน์ หล้ามาชน',
  })
  DoctorFirstName?: string;

  @ApiProperty({
    example: '',
  })
  DoctorMidName?: string;

  @ApiProperty({
    example: '',
  })
  DoctorLastName?: string;

  @ApiProperty({
    example: 'พญ.',
  })
  DoctorENTitle?: string;

  @ApiProperty({
    example:
      'WILAIRUT LAMACHON, MD.',
  })
  DoctorENFirstName?: string;

  @ApiProperty({
    example: '',
  })
  DoctorENMidName?: string;

  @ApiProperty({
    example: '',
  })
  DoctorENLastName?: string;

  @ApiProperty({
    example: 24843,
  })
  DoctorCodeAtLocation?: number;

  @ApiProperty({
    example: '3',
  })
  LocationCode?: string;

  @ApiProperty({
    example: 'กุมารเวช',
  })
  LocationDescTH?: string;

  @ApiProperty({
    example: 'Pediatrics',
  })
  LocationDescEN?: string;

  @ApiProperty({
    type: [
      DoctorSpecialtyItemDto,
    ],
  })
  DoctorSpecialty?: DoctorSpecialtyItemDto[];

  @ApiProperty({
    example:
      'คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น',
  })
  EducationTH?: string;

  @ApiProperty({
    example:
      'Faculty of Medicine, Khon Kaen University',
  })
  EducationEN?: string;

  @ApiProperty({
    example: true,
  })
  DoNotShowOnPatientSide?: boolean;

 @ApiProperty({
    example: '//XX.XX.XX.XX/XXX/XXXX/XXXX.jpg',
    description: 'URL สำหรับเรียกดูรูปแพทย์',
  })
  DoctorimageURL?: string;

  @ApiProperty({
    type: String,
    format: 'byte',
    required: false,
    example: '/9j/4AAQSkZJRgABAQAAAQABAAD...',
    description: 'รูปแพทย์ในรูปแบบ Base64 (ไม่รวม data:image/jpeg;base64,)',
  })
  Doctorimage?: string;
}