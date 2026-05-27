import { Module } from '@nestjs/common';
import { DoctorprofilesService } from './doctorprofiles.service';
import { DoctorprofilesController } from './doctorprofiles.controller';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { DOCTOR_DB_CONN, } from '../../database/constants/connection.constant';
import { DoctorprofilesRepository, } from './repositories/doctorprofiles.repository';
import { DoctorprofilesHisRepository, } from './repositories/doctorprofiles-his.repository';
import { DoctorProfile, } from './entities/doctor-profile.entity';
import { DoctorLocation, } from './entities/doctor-location.entity';
import { DoctorTitle, } from './entities/doctor-title.entity';
import { DoctorPosition, } from './entities/doctor-position.entity';
import { DoctorType, } from './entities/doctor-type.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        DoctorProfile,
        DoctorLocation,
        DoctorTitle,
        DoctorPosition,
        DoctorType,
      ],
      DOCTOR_DB_CONN,
    ),
  ],
  controllers: [DoctorprofilesController],
  providers: [DoctorprofilesService,
    DoctorprofilesRepository,
    DoctorprofilesHisRepository,],
})
export class DoctorprofilesModule { }
