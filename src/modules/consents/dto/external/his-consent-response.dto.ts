import { ApiProperty } from '@nestjs/swagger';

export class HisConsentItemResponseDto {
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
  })
  ConsentUpdateTime?: string;
}

export class HisConsentResponseDto {
  @ApiProperty()
  hn!: string;

  @ApiProperty({
    type: [HisConsentItemResponseDto],
  })
  Consents?: HisConsentItemResponseDto[];
}