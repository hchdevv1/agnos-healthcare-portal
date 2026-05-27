/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: '6010135',
    description: 'Hospital username',
  })
  @IsString()
  @IsNotEmpty()
  Username!: string;

  @ApiProperty({
    example: '0202199',
    description: 'Hospital password',
  })
  @IsString()
  @IsNotEmpty()
  Password!: string;
}