import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import {VisitsRepository} from './repositories/visits.repository';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService,VisitsRepository],
})
export class VisitsModule {}
