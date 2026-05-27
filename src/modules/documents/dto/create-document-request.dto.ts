/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateDocumentRequestDto {
  @ApiProperty({
    example: '60-019471',
  })
  @Transform(({ value }) =>
    value?.trim(),
  )
  @IsString()
  @IsNotEmpty()
  hn!: string;

  @ApiProperty({
    example: 'REFER',
  })
  @Transform(({ value }) =>
    value?.trim()?.toUpperCase(),
  )
  @IsString()
  @IsNotEmpty()
  DocumentCode!: string;

  @ApiPropertyOptional({
    example: '',
  })
  @Transform(({ value }) =>
    value?.trim(),
  )
  @IsOptional()
  @IsString()
  DocumentPageNo?: string;

  @ApiProperty({
    example:
      '2026-05-22 08:12:57',
  })
  @Transform(({ value }) =>
    value?.trim(),
  )
  @IsString()
  @Matches(
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
    {
      message:
        'UploadDateTime must be in format YYYY-MM-DD HH:mm:ss',
    },
  )
  UploadDateTime!: string;

  @ApiProperty({
    example: '123',
  })
  @Transform(({ value }) =>
    value?.trim(),
  )
  @IsString()
  @IsNotEmpty()
  DocumentUrl!: string;

  @ApiProperty({
    example: '.jpeg',
  })
  @Transform(({ value }) =>
    value?.trim()?.toLowerCase(),
  )
  @IsString()
  @IsNotEmpty()
  DocumentType!: string;
}