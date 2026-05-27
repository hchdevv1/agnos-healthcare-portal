import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentResultDto {
  @ApiProperty({
    example: '60-019471',
  })
  hn?: string;

  @ApiProperty({
    example:
      'https:\\\\10.10.17.142\\Upload\\HCHIMPORT\\AGNOSHEALTH\\REFER\\60-019471\\60-019471_20260522_081257.jpeg',
  })
  DocumentPath?: string;
}

export class CreateDocumentResponseDto {
  @ApiProperty({
    example: 200,
  })
  StatusCode?: number;

  @ApiProperty({
    type: CreateDocumentResultDto,
  })
  result?: CreateDocumentResultDto;
}