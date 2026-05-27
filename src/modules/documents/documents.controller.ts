import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DocumentsService } from './documents.service';

import { CreateDocumentRequestDto } from './dto/create-document-request.dto';

import { CreateDocumentResponseDto } from './dto/create-document-response.dto';

@ApiTags('Documents')
@Controller({
  path: 'documents',
  version: '1',
})
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Create document metadata',
  })
  @ApiResponse({
    status: 200,
    type: CreateDocumentResponseDto,
  })
  async createDocument(
    @Body()
    payload: CreateDocumentRequestDto,
  ): Promise<CreateDocumentResponseDto> {
    return this.documentsService.createDocument(
      payload,
    );
  }
}