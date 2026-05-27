import { ApiProperty } from '@nestjs/swagger';

export class HisCreateEpisodeErrorDto {
  @ApiProperty()
  field!: string;

  @ApiProperty()
  message!: string;
}

export class HisCreateEpisodeResponseDto {
  @ApiProperty({
    example: 201,
  })
  StatusCode!: number;

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

  @ApiProperty({
    type: [HisCreateEpisodeErrorDto],
    required: false,
  })
  errors?: HisCreateEpisodeErrorDto[];
}