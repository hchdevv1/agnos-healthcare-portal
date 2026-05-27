import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import {AppointmentsRepository} from './repositories/appointments.repository';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService ,AppointmentsRepository],
})
export class AppointmentsModule {}
