/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class UpdateConsentItemDto {
  @ApiProperty({
    example: 'marketing_consent',
  })
  @IsString()
  @IsNotEmpty()
  ConsentKey!: string;

  @ApiProperty({
    example:
      '2.2 เพื่อวัตถุประสงค์ทางการตลาดของสถานพยาบาล',
  })
  @IsString()
  @IsNotEmpty()
  ConsentText!: string;

  @ApiProperty({
    example:
      '2.2 เพื่อวัตถุประสงค์ทางการตลาดของสถานพยาบาล',
  })
  @IsString()
  @IsNotEmpty()
  ConsentShortText!: string;

  @ApiProperty({
    example:
      'For the purpose of analysing my health information.',
  })
  @IsString()
  @IsNotEmpty()
  ConsentTextENG!: string;

  @ApiProperty({
    example:
      '2.2 Hospital Marketing Purposes',
  })
  @IsString()
  @IsNotEmpty()
  ConsentShortTextENG!: string;

  @ApiProperty({
    example: '1.1',
  })
  @IsString()
  @IsNotEmpty()
  ConsentVersion!: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  ConsentValue!: boolean;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  ConsentUpdateTime?: string;
}

export class UpdateConsentDto {
  @ApiProperty({
    example: '64-024577',
  })
  @IsString()
  @IsNotEmpty()
  hn!: string;

  @ApiProperty({
    type: [UpdateConsentItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateConsentItemDto)
  Consents!: UpdateConsentItemDto[];
}