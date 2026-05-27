import { ApiProperty } from '@nestjs/swagger';

export class HisCreateDocumentResponseDto {
  @ApiProperty({
    example: 200,
  })
  StatusCode?: number;

  @ApiProperty({
    example: '60-019471',
  })
  hn?: string;

  @ApiProperty({
    example:
      '\\\\10.10.17.142\\Upload\\HCHIMPORT\\AGNOSHEALTH\\REFER\\60-019471\\60-019471_20260522_081257.jpeg',
  })
  DocumentPath?: string;
}