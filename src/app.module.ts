/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {DatabaseModule} from './database/database.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ConsentsModule } from './modules/consents/consents.module';
import { VisitsModule } from './modules/visits/visits.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { DoctorprofilesModule } from './modules/doctorprofiles/doctorprofiles.module';
import { LoginModule } from './modules/login/login.module';
import { DocumentsModule } from './modules/documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

DatabaseModule,
  
    PatientsModule,
    ConsentsModule,
    VisitsModule,
    AppointmentsModule,
    DoctorprofilesModule,
    LoginModule,
    DocumentsModule,
  ],
})
export class AppModule {}
