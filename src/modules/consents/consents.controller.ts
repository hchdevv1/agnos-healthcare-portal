import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ConsentsService } from './consents.service';
import { ConsentDto } from './dto/consent.dto';
import { ConsentResponseDto } from './dto/consent-response.dto';
import { UpdateConsentDto } from './dto/update-consent.dto';
import { UpdateConsentResponseDto } from './dto/update-consent-response.dto';

@ApiTags('Consents')
@Controller('consents')
export class ConsentsController {
  constructor(
    private readonly consentsService: ConsentsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get patient consent information',
    description:
      'Retrieve patient consent information from external HIS system.',
  })
  @ApiBody({
    type: ConsentDto,
  })
  @ApiOkResponse({
    description:
      'Patient consent retrieved successfully.',
    type: ConsentResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request payload.',
  })
  async getConsent(
    @Body()
    consentDto: ConsentDto,
  ): Promise<ConsentResponseDto> {
    return this.consentsService.getConsent(
      consentDto,
    );
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update patient consent information',
    description:
      'Update patient consent information in external HIS system.',
  })
  @ApiBody({
    type: UpdateConsentDto,
  })
  @ApiOkResponse({
    description:
      'Patient consent updated successfully.',
    type: UpdateConsentResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request payload.',
  })
  async updateConsent(
    @Body()
    updateConsentDto: UpdateConsentDto,
  ): Promise<UpdateConsentResponseDto> {
    return this.consentsService.updateConsent(
      updateConsentDto,
    );
  }
}