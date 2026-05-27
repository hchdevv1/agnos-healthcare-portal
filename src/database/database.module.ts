// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfileConfigService } from './providers/mysql-hchintranet.provider';
import { DOCTOR_DB_CONN } from './constants/connection.constant';


@Global() // ทำให้ทุก Module เรียกใช้ Database ได้โดยไม่ต้องคอย Import ใหม่
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DOCTOR_DB_CONN, 
      useClass: DoctorProfileConfigService,
    
    }),
    // หากมีฐานข้อมูลที่ 2 (เช่น PostgreSQL) ก็เพิ่ม TypeOrmModule.forRootAsync อีกตัวที่นี่
  ],
  providers: [DoctorProfileConfigService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}