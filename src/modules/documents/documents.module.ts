import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './repositories/documents.repository';
@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService ,DocumentsRepository],
})
export class DocumentsModule {}
