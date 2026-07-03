/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadGatewayException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { DoctorprofilesRepository } from './repositories/doctorprofiles.repository';
import { DoctorprofilesHisRepository } from './repositories/doctorprofiles-his.repository';

import { DoctorProfileQueryDto } from './dto/doctor-profile-query.dto';
import { GetDoctorProfileResponseDto } from './dto/get-doctor-profile-response.dto';
import axios from 'axios';

@Injectable()
export class DoctorprofilesService {
  private readonly logger =
    new Logger(
      DoctorprofilesService.name,
    );

  constructor(
    private readonly doctorprofilesRepository: DoctorprofilesRepository,
    private readonly doctorprofilesHisRepository: DoctorprofilesHisRepository,
  ) { }
  async getDoctorProfiles(
    query: DoctorProfileQueryDto,
  ): Promise<GetDoctorProfileResponseDto> {
    this.logger.log(
      'Searching doctor profiles',
    );

    let locationIds: number[] = [];

    /**
     * IMPORTANT
     * If doctor_code exists,
     * ignore LocationCode filtering
     * and use HIS-driven flow
     */
    if (!query.doctor_code) {
      locationIds =
        await this.doctorprofilesRepository.findLocationIdsByHisLocationCode(
          query.LocationCode ?? '',
        );
    }

    const doctorProfiles =
      await this.doctorprofilesRepository.findDoctorProfiles(
        query,
        locationIds,
      );

    const hisPayload = {
      LocationCode: query.doctor_code
        ? ''
        : query.LocationCode ?? '',

      Doctors: query.doctor_code
        ? [
          {
            doctorcode: String(
              query.doctor_code,
            ).trim(),
          },
        ]
        : doctorProfiles.map(
          (doctor) => ({
            doctorcode: String(
              doctor.doctor_code,
            ).trim(),
          }),
        ),
    };

    const hisResponse =
      await this.doctorprofilesHisRepository.getDoctorProfiles(
        hisPayload,
      );

    if (
      !hisResponse ||
      !hisResponse.Doctors
    ) {
      this.logger.error(
        'Malformed HIS doctor response',
      );

      throw new BadGatewayException(
        'Malformed HIS doctor response',
      );
    }

    const hisDoctors = Array.isArray(
      hisResponse.Doctors,
    )
      ? hisResponse.Doctors
      : [hisResponse.Doctors];

    const validatedDoctors =
      hisDoctors.filter(
        (doctor) =>
          String(
            doctor.flag,
          ).trim() === 'Y',
      );

    const imageBaseUrl =
      process.env.DOCTOR_IMAGE_BASE_URL?.replace(
        /\/$/,
        '',
      ) ?? '';

    const mergedDoctors = (
      await Promise.all(
        validatedDoctors.map(
          async (hisDoctor) => {
            const matchedDoctor =
              doctorProfiles.find(
                (doctor) =>
                  String(
                    doctor.doctor_code,
                  ).trim() ===
                  String(
                    hisDoctor.doctorcode,
                  ).trim(),
              );

            if (!matchedDoctor) {
              return null;
            }


            const doctorImage =
              await this.getDoctorImageBase64(matchedDoctor.doctor_image_path,);

            return {
              doctor_code: Number(
                matchedDoctor.doctor_code,
              ),

              DoctorTitle:
                matchedDoctor.title_name ??
                '',

              DoctorFirstName:
                matchedDoctor.doctor_name ??
                '',

              DoctorMidName: '',

              DoctorLastName: '',

              DoctorENTitle:
                matchedDoctor.title_name ??
                '',

              DoctorENFirstName:
                matchedDoctor.doctor_engname ??
                '',

              DoctorENMidName:
                '',

              DoctorENLastName:
                '',


              DoctorCodeAtLocation:
                Number(
                  matchedDoctor.doctor_code,
                ),

              LocationCode:
                hisDoctor.LocationCode ??
                '',

              LocationDescTH:
                matchedDoctor.location_name ??
                '',

              LocationDescEN:
                matchedDoctor.location_name ??
                '',

              DoctorSpecialty: [
                {
                  DoctorSpecialtyCode:
                    hisDoctor.specialtycode ??
                    '',

                  DoctorSpecialtyDesc:
                    hisDoctor.specialtyname ??
                    '',

                  DoctorSubSpecialtyCode:
                    hisDoctor.subspecialtycode ??
                    '',

                  DoctorSubSpecialtyDesc:
                    hisDoctor.subspecialtyname ??
                    '',
                },
              ],

              EducationTH:
                matchedDoctor.doctor_institution ??
                '',

              EducationEN:
                matchedDoctor.doctor_institution ??
                '',

              DoNotShowOnPatientSide:
                false,
                       
              DoctorimageURL:
                matchedDoctor.doctor_image_path
                  ? `${imageBaseUrl}/${matchedDoctor.doctor_image_path.replace(/\\/g, '/')}`
                  : '',

              Doctorimage:
                doctorImage,
            };
          },
        ),
      )
    ).filter(
      (
        doctor,
      ): doctor is NonNullable<
        typeof doctor
      > => doctor !== null,
    );

    const total =
      mergedDoctors.length;

    const paginatedDoctors =
      mergedDoctors.slice(
        query.Offset ?? 0,
        (query.Offset ?? 0) +
        (query.Limit ?? 5000),
      );

    return {
      Total: total,
      DoctorList:
        paginatedDoctors,
    };
  }

  private async getDoctorImageBase64(
    imagePath: string | null | undefined,
  ): Promise<string> {
    if (!imagePath) {
      return '';
    }

    try {
      const baseUrl =
        process.env.DOCTOR_IMAGE_FETCH_URL?.replace(
          /\/$/,
          '',
        ) ?? '';

      const imageUrl =
        `${baseUrl}/${imagePath.replace(/\\/g, '/')}`;

      const response =
        await axios.get(
          imageUrl,
          {
            responseType: 'arraybuffer',
            timeout:
              Number(
                process.env.DOCTOR_IMAGE_TIMEOUT,
              ) || 5000,
          },
        );

      return Buffer.from(
        response.data,
      ).toString('base64');
    } catch (error) {
      this.logger.error(
        `Unable to download doctor image: ${imagePath}`,
        error instanceof Error
          ? error.stack
          : String(error),
      );

      return '';
    }
  }
}