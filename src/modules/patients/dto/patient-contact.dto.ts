/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class PatientContactDto {
  @ApiPropertyOptional({
    description: 'Contact type identifier',
    example: 'MOBILE',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  contactType?: string;

  @ApiPropertyOptional({
    description: 'Contact value',
    example: '0666666666',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  contactValue?: string;
}