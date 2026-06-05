/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  PartialType,
} from '@nestjs/swagger';

import {
  IsString,
  MaxLength,
} from 'class-validator';

import { UpdatePatientDto } from './update-patient.dto';

export class PatchPatientDto extends PartialType(
  UpdatePatientDto,
) {
  @IsString()
  @MaxLength(10)
  hn!: string;
}