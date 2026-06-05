import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { DOCTOR_DB_CONN } from '../../../database/constants/connection.constant';

import { DoctorProfile } from '../entities/doctor-profile.entity';
import { DoctorLocation } from '../entities/doctor-location.entity';
import { DoctorProfileQueryDto } from '../dto/doctor-profile-query.dto';

@Injectable()
export class DoctorprofilesRepository {
  constructor(
    @InjectRepository(
      DoctorProfile,
      DOCTOR_DB_CONN,
    )
    private readonly doctorProfileRepository: Repository<DoctorProfile>,

    @InjectRepository(
      DoctorLocation,
      DOCTOR_DB_CONN,
    )
    private readonly doctorLocationRepository: Repository<DoctorLocation>,
  ) {}

  async findLocationIdsByHisLocationCode(
    locationCode: string,
  ): Promise<number[]> {
    if (!locationCode) {
      return [];
    }

    const locations =
      await this.doctorLocationRepository
        .createQueryBuilder(
          'doctorlocation',
        )
        .where(
          'FIND_IN_SET(:locationCode, doctorlocation.his_ref_codes)',
          {
            locationCode,
          },
        )
        .getMany();

   return locations
  .map(
    (item) =>
      item.location_id,
  )
  .filter(
    (
      locationId,
    ): locationId is number =>
      locationId !== undefined,
  );
  }

  async findDoctorProfiles(
    query: DoctorProfileQueryDto,
    locationIds: number[],
  ): Promise<any[]> {
    const qb =
      this.doctorProfileRepository
        .createQueryBuilder(
          'doctorprofile',
        )
        .leftJoin(
          'emp_title',
          'emptitle',
          'doctorprofile.doctor_title_id = emptitle.title_id',
        )
        .leftJoin(
          'emp_position',
          'empposition',
          'doctorprofile.doctor_position_id = empposition.position_id',
        )
        .leftJoin(
          'doctor_type',
          'doctortype',
          'doctorprofile.doctor_type_id = doctortype.doctor_type_id',
        )
        .leftJoin(
          'doctor_location',
          'doctorlocation',
          'doctorprofile.location_id = doctorlocation.location_id',
        )
        .select([
          'doctorprofile.doctor_id as doctor_id',
          'doctorprofile.doctor_code as doctor_code',
          'emptitle.title_name as title_name',
          'doctorprofile.doctor_name as doctor_name',
          'doctorprofile.doctor_engname as doctor_engname',
          'empposition.position_name as position_name',
          'doctortype.doctor_type_name as doctor_type_name',
          'doctorlocation.location_id as location_id',
          'doctorlocation.location_name as location_name',
          'doctorprofile.doctor_institution as doctor_institution',
          'doctorprofile.doctor_branch as doctor_branch',
          'doctorprofile.doctor_year as doctor_year',
          'doctorprofile.doctor_institution1 as doctor_institution1',
          'doctorprofile.doctor_branch1 as doctor_branch1',
          'doctorprofile.doctor_year1 as doctor_year1',
          'doctorprofile.doctor_institution2 as doctor_institution2',
          'doctorprofile.doctor_branch2 as doctor_branch2',
          'doctorprofile.doctor_year2 as doctor_year2',
        ]);

    if (query.doctor_code) {
      qb.andWhere(
        'doctorprofile.doctor_code = :SAPcode',
        {
          SAPcode: query.doctor_code,
        },
      );
    }

    if (
      query.DoctorCodeAtLocation
    ) {
      qb.andWhere(
        'doctorprofile.doctor_code = :DoctorCodeAtLocation',
        {
          DoctorCodeAtLocation:
            query.DoctorCodeAtLocation,
        },
      );
    }

    if (
      locationIds.length > 0
    ) {
      qb.andWhere(
        'doctorprofile.location_id IN (:...locationIds)',
        {
          locationIds,
        },
      );
    }

    return qb.getRawMany();
  }
}