import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeResponseDto {
  @ApiProperty({
    example: '52-056586',
  })
  hn!: string;

  @ApiProperty({
    example: 'O020652-69',
  })
  en!: string;

  @ApiProperty({
    example: 'Current',
  })
  en_status!: string;

  @ApiProperty({
    example: '174||139424||1',
  })
  appointment_id!: string;

  @ApiProperty({
    example: '',
    nullable: true,
  })
  doctorID!: string;

  @ApiProperty({
    example: '',
    nullable: true,
  })
  location_code!: string;

  @ApiProperty({
    example: '',
    nullable: true,
  })
  note!: string;
}