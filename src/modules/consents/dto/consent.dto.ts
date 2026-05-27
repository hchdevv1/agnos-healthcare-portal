/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ApiProperty,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ConsentDto {
  @ApiProperty({
    example: '64-024577',
  })
  @IsString()
  @IsNotEmpty()
  hn!: string;
}