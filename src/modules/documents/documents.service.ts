import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { DocumentsRepository } from './repositories/documents.repository';

import { CreateDocumentRequestDto } from './dto/create-document-request.dto';

import { CreateDocumentResponseDto } from './dto/create-document-response.dto';

@Injectable()
export class DocumentsService {
  private readonly logger =
    new Logger(
      DocumentsService.name,
    );

  constructor(
    private readonly documentsRepository: DocumentsRepository,
  ) {}

  async createDocument(
    payload: CreateDocumentRequestDto,
  ): Promise<CreateDocumentResponseDto> {
    this.logger.log(
      `Creating document metadata for HN ${payload.hn}`,
    );

    const response =
      await this.documentsRepository.createDocument(
        payload,
      );

    return {
      StatusCode: 200,
      result: {
        hn: response.hn,
        DocumentPath:
          response.DocumentPath,
      },
    };
  }
}