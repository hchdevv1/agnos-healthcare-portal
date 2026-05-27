// src/database/providers/mysql-config.provider.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';


import { DoctorProfile } from '../../modules/doctorprofiles/entities/doctor-profile.entity';
import { DoctorLocation } from '../../modules/doctorprofiles/entities/doctor-location.entity';
import { DoctorType } from '../../modules/doctorprofiles/entities/doctor-type.entity';
import { DoctorPosition } from '../../modules/doctorprofiles/entities/doctor-position.entity';
import { DoctorTitle } from '../../modules/doctorprofiles/entities/doctor-title.entity';

@Injectable()
export class DoctorProfileConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_MYSQL_DoctorProfile_HOST'),
      port: this.configService.get<number>('DB_MYSQL_DoctorProfile_PORT'),
      username: this.configService.get<string>('DB_MYSQL_DoctorProfile_USER'),
      password: this.configService.get<string>('DB_MYSQL_DoctorProfile_PASS'),
      database: this.configService.get<string>('DB_MYSQL_DoctorProfile_NAME'),
      entities: [DoctorProfile,DoctorLocation,DoctorType,
        DoctorPosition,DoctorTitle,],
      synchronize: false, 
      logging: false,
    
    };
  }
}