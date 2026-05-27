import {
  Controller,
  Get,
  Logger,
  Query,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { DoctorprofilesService } from './doctorprofiles.service';
import {DoctorProfileQueryDto} from './dto/doctor-profile-query.dto';
import { GetDoctorProfileResponseDto } from './dto/get-doctor-profile-response.dto';

@ApiTags('DoctorProfiles')
@Controller('doctorprofiles')
export class DoctorprofilesController {
  private readonly logger =
    new Logger(
      DoctorprofilesController.name,
    );

  constructor(
    private readonly doctorprofilesService: DoctorprofilesService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      'Get doctor profile list',
  })
  @ApiOkResponse({
    type:
      GetDoctorProfileResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request parameters',
  })
  async getDoctorProfiles(
    @Query()
    query: DoctorProfileQueryDto,
  ): Promise<GetDoctorProfileResponseDto> {
    this.logger.log(
      `GET Doctor Profile request received`,
    );

    return this.doctorprofilesService.getDoctorProfiles(
      query,
    );
  }
}