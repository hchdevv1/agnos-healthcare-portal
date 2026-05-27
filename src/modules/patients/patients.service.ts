import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { SearchPatientDto } from './dto/search-patient.dto';
import { PatientResponseDto,SearchPatientResponseDto } from './dto/search-patient-response.dto';

import { CreatePatientDto } from './dto/create-patient.dto';
import { CreatePatientResponseDto } from './dto/create-patient-response.dto';

import { PatientsRepository } from './repositories/patients.repository';
import { UpdatePatientDto} from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  private readonly logger =
    new Logger(PatientsService.name);

  constructor(
    private readonly patientsRepository: PatientsRepository,
  ) {}

async searchPatients(
  searchPatientDto: SearchPatientDto,
): Promise<SearchPatientResponseDto> {

const hasContactSearch =
  Array.isArray(
    searchPatientDto.contact,
  ) &&
  searchPatientDto.contact.some(
    (contact) =>
      Boolean(
        contact.contactValue,
      ),
  );


  const hasSearchCriteria = Boolean(
    searchPatientDto.hn ||
      searchPatientDto.givenName ||
      searchPatientDto.middleName ||
      searchPatientDto.familyName ||
      searchPatientDto.otherGivenName ||
      searchPatientDto.otherFamilyName ||
      searchPatientDto.otherMiddleName ||
      searchPatientDto.birthDate ||
      searchPatientDto.natID ||
      searchPatientDto.passportNumber ||
      hasContactSearch,
  );

  if (!hasSearchCriteria) {
    this.logger.warn(
      'SearchPatient request rejected due to missing search criteria',
    );

    throw new BadRequestException(
      'At least one patient search criteria is required.',
    );
  }

  const patients =
    await this.patientsRepository.searchPatients(
      searchPatientDto,
    );

  if (patients.length > 100) {
    this.logger.warn(
      `SearchPatient results truncated from ${patients.length} to 100 records`,
    );
  }

  const limitedPatients =
    patients.slice(0, 100);

  this.logger.log(
    `SearchPatient returned ${limitedPatients.length} patient records`,
  );

  return {
    patient: limitedPatients,
  };
}

  async createPatient(
    createPatientDto: CreatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    const response =
      await this.patientsRepository.createPatient(
        createPatientDto,
      );

    switch (response.StatusCode) {
      case 200:
        this.logger.log(
          `Patient created successfully with HN ${response.HN}`,
        );

        return response;

      case 400:
        this.logger.warn(
          'TRAKCARE CreatePatient validation failed',
        );

        throw new BadRequestException({
          message:
            response.errors?.[0]?.message ??
            'Patient creation validation failed',
          errors: response.errors ?? [],
        });

      case 409:
        this.logger.warn(
          'TRAKCARE CreatePatient duplicate patient detected',
        );

        throw new ConflictException({
          message:
            response.errors?.[0]?.message ??
            'Patient already exists',
          errors: response.errors ?? [],
        });

      case 500:
        this.logger.error(
          'TRAKCARE CreatePatient returned server error',
        );

        throw new BadGatewayException({
          message:
            'External HIS service error',
        });

      default:
        this.logger.error(
          `Unexpected TRAKCARE CreatePatient status: ${response.StatusCode}`,
        );

        throw new BadGatewayException({
          message:
            'Unexpected external HIS response',
        });
    }
  }
  async updatePatient(
  updatePatientDto: UpdatePatientDto,
): Promise<CreatePatientResponseDto> {
  const response =
    await this.patientsRepository.updatePatient(
      updatePatientDto,
    );

  switch (response.StatusCode) {
    case 200:
      this.logger.log(
        `Patient updated successfully with HN ${response.HN}`,
      );

      return response;

    case 400:
      this.logger.warn(
        'TRAKCARE UpdatePatient validation failed',
      );

      throw new BadRequestException({
        message:
          response.errors?.[0]?.message ??
          'Patient update validation failed',
        errors: response.errors ?? [],
      });

    case 409:
      this.logger.warn(
        'TRAKCARE UpdatePatient conflict detected',
      );

      throw new ConflictException({
        message:
          response.errors?.[0]?.message ??
          'Patient update conflict detected',
        errors: response.errors ?? [],
      });

    case 500:
      this.logger.error(
        'TRAKCARE UpdatePatient returned server error',
      );

      throw new BadGatewayException({
        message:
          'External HIS service error',
      });

    default:
      this.logger.error(
        `Unexpected TRAKCARE UpdatePatient status: ${response.StatusCode}`,
      );

      throw new BadGatewayException({
        message:
          'Unexpected external HIS response',
      });
  }
}
}