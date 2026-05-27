import axios, {
  AxiosInstance,
} from 'axios';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { CreateDocumentRequestDto } from '../dto/create-document-request.dto';
import { HisCreateDocumentResponseDto } from '../dto/external/his-create-document-response.dto';
import { handleHisTransportError } from '../../../common/utils/his-transport-error-handler';

@Injectable()
export class DocumentsRepository {
  private readonly logger =
    new Logger(
      DocumentsRepository.name,
    );

  private readonly axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      timeout: Number(
        process.env.TRAKCARE_TIMEOUT_MS ??
          30000,
      ),
      headers: {
        'Content-Type':
          'application/json',
      },
    });
  }

  async createDocument(
    payload: CreateDocumentRequestDto,
  ): Promise<HisCreateDocumentResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_DOCUMENT_UPLOAD_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE Document Upload API',
    );

    try {
      const response =
        await this.axiosClient.post<HisCreateDocumentResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE Document Upload API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS Document Upload',
      );
    }
  }
}