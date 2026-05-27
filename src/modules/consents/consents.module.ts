import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConsentsController } from './consents.controller';
import { ConsentsService } from './consents.service';
import { ConsentsRepository } from './repositories/consents.repository';

@Module({
  imports: [ConfigModule],
  controllers: [ConsentsController],
  providers: [
    ConsentsService,
    ConsentsRepository,
  ],
})
export class ConsentsModule {}