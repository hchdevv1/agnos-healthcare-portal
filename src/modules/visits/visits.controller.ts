import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post, Put,
} from '@nestjs/common';

import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { VisitListDto } from './dto/visit-list.dto';
import { VisitListResponseDto } from './dto/visit-list-response.dto';
import { VisitsService } from './visits.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { CreateEpisodeResponseDto } from './dto/create-episode-response.dto';


@ApiTags('Visits')
@Controller('visits')
export class VisitsController {
  constructor(
    private readonly visitsService: VisitsService,
  ) { }

  @Post('getvisitlist')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Retrieve patient visit list from TRAKCARE',
    description:
      'Get visit and appointment information by HN, EN, location code, or date range',
  })
  @ApiOkResponse({
    description:
      'Visit list retrieved successfully',
    type: VisitListResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request payload or validation failed',
  })
  @ApiNotFoundResponse({
    description:
      'Visit information not found',
  })
  @ApiConflictResponse({
    description:
      'Duplicate or conflicting visit data',
  })
  @ApiBadGatewayResponse({
    description:
      'TRAKCARE integration service unavailable',
  })
  async getVisitList(
    @Body()
    payload: VisitListDto,
  ): Promise<
    Omit<
      VisitListResponseDto,
      'StatusCode' | 'errors'
    >
  > {
    return this.visitsService.getVisitList(
      payload,
    );
  }

  @Put('createepisode')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Create patient episode from TRAKCARE',
    description:
      'Create episode for patient visit and return encounter information',
  })
  @ApiOkResponse({
    description:
      'Episode created successfully',
    type: CreateEpisodeResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request payload or validation failed',
  })
  @ApiNotFoundResponse({
    description:
      'Patient information not found',
  })
  @ApiConflictResponse({
    description:
      'Duplicate or conflicting episode data',
  })
  @ApiBadGatewayResponse({
    description:
      'TRAKCARE integration service unavailable',
  })
  async createEpisode(
    @Body()
    payload: CreateEpisodeDto,
  ): Promise<
    Omit<
      CreateEpisodeResponseDto,
      'StatusCode' | 'errors'
    >
  > {
    return this.visitsService.createEpisode(
      payload,
    );
  }
}