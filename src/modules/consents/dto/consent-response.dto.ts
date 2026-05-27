import { ApiProperty } from '@nestjs/swagger';

export class ConsentItemResponseDto {
  @ApiProperty()
  ConsentKey?: string;

  @ApiProperty()
  ConsentText?: string;

  @ApiProperty()
  ConsentShortText?: string;

  @ApiProperty()
  ConsentTextENG?: string;

  @ApiProperty()
  ConsentShortTextENG?: string;

  @ApiProperty()
  ConsentVersion?: string;

  @ApiProperty()
  ConsentValue?: boolean;

  @ApiProperty({
    nullable: true,
    example: '',
  })
  ConsentUpdateTime?: string;
}

export class ConsentResponseDto {
  @ApiProperty({
    example: '64-024577',
  })
  hn!: string;

  @ApiProperty({
    type: [ConsentItemResponseDto],
  })
  Consents?: ConsentItemResponseDto[];
}