/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, {
  AxiosInstance,
  AxiosError,
} from 'axios';

import {
  Injectable,
  Logger,
  BadRequestException
} from '@nestjs/common';

import { SearchPatientDto } from '../dto/search-patient.dto';
import { CreatePatientResponseDto, } from '../dto/create-patient-response.dto';
import { PatientResponseDto, } from '../dto/search-patient-response.dto'
import { CreatePatientDto, } from '../dto/create-patient.dto';
import { UpdatePatientDto, } from '../dto/update-patient.dto';
import { handleHisTransportError, } from '../../../common/utils/his-transport-error-handler';
import { PatchPatientDto } from '../dto/patch-patient.dto';
import { SsoEligibleDto } from '../dto/sso-eligible.dto';
import { SsoEligibleResponseDto } from '../dto/sso-eligible-response.dto';
import { NhsoRightSearchResponseDto } from '../dto/external/nhso-right-search-response.dto';
import { HchSsoResponse } from '../dto/external/hch-sso-response.dto';
interface TrakcareSearchPatientResponse {
  StatusCode: number;
  total: number;
  patient: PatientResponseDto[];
}
interface NhsoValidationError {
  defaultMessage?: string;
  field?: string;
}

interface NhsoErrorResponse {
  errors?: NhsoValidationError[];
}
@Injectable()
export class PatientsRepository {
  private readonly logger = new Logger(
    PatientsRepository.name,
  );

  private readonly axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      timeout: Number(
        process.env.TRAKCARE_TIMEOUT_MS ??
        30000,
      ),
      headers: {
        'Content-Type':
          'application/json',
      },
    });
  }

  async searchPatients(
    payload: SearchPatientDto,
  ): Promise<PatientResponseDto[]> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_SEARCH_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE SearchPatient API',
    );

    try {
      const response =
        await this.axiosClient.post<TrakcareSearchPatientResponse>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE SearchPatient API',
      );

      return Array.isArray(
        response.data?.patient,
      )
        ? response.data.patient
        : [];
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS SearchPatient',
      );
    }
  }

  async createPatient(
    payload: CreatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_CREATE_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE CreatePatient API',
    );

    try {
      const response =
        await this.axiosClient.post<CreatePatientResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE CreatePatient API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS CreatePatient',
      );
    }
  }

  async updatePatient2(
    payload: UpdatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE UpdatePatient API',
    );

    try {
      const response =
        await this.axiosClient.put<CreatePatientResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE UpdatePatient API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS UpdatePatient',
      );
    }
  }
  async updatePatient3(
    payload: UpdatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE UpdatePatient API',
    );

    try {
      const cleanedPayload =
        this.removeEmptyFields(
          payload,
        );

      this.logger.debug(
        `UpdatePatient payload: ${JSON.stringify(
          cleanedPayload,
        )}`,
      );

      const response =
        await this.axiosClient.put<CreatePatientResponseDto>(
          apiUrl,
          cleanedPayload,
        );

      this.logger.log(
        'Received response from TRAKCARE UpdatePatient API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS UpdatePatient',
      );
    }
  }
async updatePatient(
  payload: UpdatePatientDto,
): Promise<CreatePatientResponseDto> {
  const apiUrl =
    `${process.env.TRAKCARE_URL}` +
    `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
    `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

  this.logger.log(
    'Calling TRAKCARE UpdatePatient API',
  );

  try {
    const cleanedPayload = JSON.parse(
      JSON.stringify(
        payload,
        (_, value) => {
          if (
            value === '' ||
            value === null ||
            value === undefined
          ) {
            return undefined;
          }

          return value;
        },
      ),
    ) as UpdatePatientDto;

    this.logger.debug(
      `UpdatePatient payload: ${JSON.stringify(
        cleanedPayload,
      )}`,
    );

    const response =
      await this.axiosClient.put<CreatePatientResponseDto>(
        apiUrl,
        cleanedPayload,
      );

    this.logger.log(
      'Received response from TRAKCARE UpdatePatient API',
    );
this.logger.debug(
  `UpdatePatient payload: ${JSON.stringify(cleanedPayload)}`,
);
    return response.data;
  } catch (error) {
    handleHisTransportError(
      error,
      this.logger,
      'HIS UpdatePatient',
    );
  }
}
  async patchPatient2(
    payload: PatchPatientDto,
  ): Promise<CreatePatientResponseDto> {
    const apiUrl =
      `${process.env.TRAKCARE_URL}` +
      `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
      `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

    this.logger.log(
      'Calling TRAKCARE PatchPatient API',
    );

    try {
      const response =
        await this.axiosClient.patch<CreatePatientResponseDto>(
          apiUrl,
          payload,
        );

      this.logger.log(
        'Received response from TRAKCARE PatchPatient API',
      );

      return response.data;
    } catch (error) {
      handleHisTransportError(
        error,
        this.logger,
        'HIS PatchPatient',
      );
    }
  }
 async patchPatient1(
  payload: PatchPatientDto,
): Promise<CreatePatientResponseDto> {
  const apiUrl =
    `${process.env.TRAKCARE_URL}` +
    `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
    `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

  this.logger.log(
    'Calling TRAKCARE PatchPatient API',
  );

  try {
    const cleanedPayload = JSON.parse(
      JSON.stringify(
        payload,
        (_, value) => {
          if (
            value === '' ||
            value === null ||
            value === undefined
          ) {
            return undefined;
          }

          return value;
        },
      ),
    ) as PatchPatientDto;

    this.logger.debug(
      `PatchPatient payload: ${JSON.stringify(
        cleanedPayload,
      )}`,
    );

    const response =
      await this.axiosClient.patch<CreatePatientResponseDto>(
        apiUrl,
        cleanedPayload,
      );

    this.logger.debug(
      `PatchPatient response: ${JSON.stringify(
        response.data,
      )}`,
    );

    this.logger.log(
      'Received response from TRAKCARE PatchPatient API',
    );

    return response.data;
  } catch (error) {
    handleHisTransportError(
      error,
      this.logger,
      'HIS PatchPatient',
    );
  }
}
async patchPatient(
  payload: PatchPatientDto,
): Promise<CreatePatientResponseDto> {
  const apiUrl =
    `${process.env.TRAKCARE_URL}` +
    `${process.env.TRAKCARE_API_GATEWAY_PATH}` +
    `${process.env.TRAKCARE_PATIENT_UPDATE_ENDPOINT}`;

  this.logger.log(
    `Calling TRAKCARE PatchPatient API for HN ${payload.hn}`,
  );

  try {
    const cleanedPayload = JSON.parse(
      JSON.stringify(
        payload,
        (_, value) => {
          if (
            value === '' ||
            value === null ||
            value === undefined
          ) {
            return undefined;
          }

          return value;
        },
      ),
    ) as PatchPatientDto;

    const response =
      await this.axiosClient.patch<CreatePatientResponseDto>(
        apiUrl,
        cleanedPayload,
      );

    this.logger.log(
      `TRAKCARE PatchPatient completed with status ${response.data.StatusCode}`,
    );

    return response.data;
  } catch (error) {
    handleHisTransportError(
      error,
      this.logger,
      'HIS PatchPatient',
    );
  }
}
async checkSsoEligible(
  payload: SsoEligibleDto,
): Promise<SsoEligibleResponseDto> {
  const apiUrl =
    `${process.env.NHSO_BASE_URL}` +
    `${process.env.NHSO_RIGHT_SEARCH_ENDPOINT}` +
    `?pid=${encodeURIComponent(
      payload.natID,
    )}`;

  this.logger.log(
    'Calling NHSO right-search API',
  );

  try {
    const response =
      await this.axiosClient.get<NhsoRightSearchResponseDto>(
        apiUrl,
        {
          headers: {
            Authorization: `Bearer ${process.env.NHSO_TOKEN}`,
          },
        },
      );

    const nhsoResponse =
      response.data;

    /*
     * Check SSO eligibility
     *
     * Eligible when:
     * funds[].hospMain.hcode === 11750
     * OR
     * funds[].hospSss.hcode === 11750
     */
    const eligible =
      nhsoResponse.funds?.some(
        (fund) =>
          fund.hospMain?.hcode ===
            '11750' ||
          fund.hospSss?.hcode ===
            '11750',
      ) ?? false;

    /*
     * Patient name
     */
    const title =
      nhsoResponse.tname ?? '';

    const firstname =
      nhsoResponse.fname ?? '';

    const lastname =
      nhsoResponse.lname ?? '';

    const fullName =
      [
        title,
        firstname,
        lastname,
      ]
        .filter(
          (value) =>
            value !== '',
        )
        .join(' ');

    /*
     * Patient DOB
     *
     * NHSO birthDateNew uses Gregorian year.
     * Response format:
     * YYYY-MM-DD
     */
    const year =
      nhsoResponse.birthDateNew
        ?.year;

    const month =
      nhsoResponse.birthDateNew
        ?.month;

    const day =
      nhsoResponse.birthDateNew
        ?.day;

    let dob = '';

    if (
      year !== undefined &&
      month !== undefined &&
      day !== undefined
    ) {
      dob =
        `${year}-` +
        `${String(month).padStart(2, '0')}-` +
        `${String(day).padStart(2, '0')}`;
    }

    this.logger.log(
      `NHSO right-search completed, eligible=${eligible}`,
    );

    return {
      eligible,
      patient: {
        ssoid:
          nhsoResponse.pid ?? '',
        title,
        firstname,
        lastname,
        FullName: fullName,
        DOB: dob,
        Gender:
          nhsoResponse.sex?.name ??
          '',
      },
    };
  } catch (error: unknown) {
    /*
     * ==========================================
     * NHSO Error Handling
     * ==========================================
     */
    if (
      axios.isAxiosError(error)
    ) {
      const axiosError =
        error as AxiosError<NhsoErrorResponse>;

      /*
       * NHSO validation error
       *
       * Do NOT fallback to HCH.
       */
      if (
        axiosError.response?.status ===
        400
      ) {
        const message =
          axiosError.response.data
            ?.errors?.[0]
            ?.defaultMessage ??
          'NHSO validation failed';

        this.logger.warn(
          `NHSO right-search validation failed: ${message}`,
        );

        throw new BadRequestException(
          message,
        );
      }

      /*
       * NHSO transport / connection failure
       *
       * Fallback to HCH Intra API.
       */
      const shouldFallback =
        axiosError.code ===
          'ECONNABORTED' ||
        axiosError.code ===
          'ETIMEDOUT' ||
        axiosError.code ===
          'ECONNREFUSED' ||
        axiosError.code ===
          'ENOTFOUND';

      if (shouldFallback) {
        this.logger.warn(
          'NHSO right-search unavailable, switching to HCH Intra SSO API',
        );

        const hchApiUrl =
          `${process.env.TRAKCARE_URL}` +
          `${process.env.TRAKCARE_HCH_SSO_PATH}` +
          `${encodeURIComponent(
            payload.natID,
          )}`;

        this.logger.log(
          'Calling HCH Intra GetPatientSSO API',
        );

        try {
          const hchResponse =
            await this.axiosClient.get<HchSsoResponse>(
              hchApiUrl,
            );

          const patientInfo =
            hchResponse.data?.PatientInfo;

          const ssoid =
            patientInfo?.ssoid ?? '';

          /*
           * HCH SSO eligibility
           *
           * ssoid has value = eligible
           */
          const eligible =
            ssoid.trim() !== '';

          /*
           * HCH DOB
           *
           * HCH returns:
           * DD/MM/YYYY
           *
           * The year is Buddhist Era (B.E.).
           *
           * Example:
           * 15/07/2528
           * ->
           * 1985-07-15
           */
          const hchDob =
            patientInfo?.DOB ?? '';

          let dob = '';

          const dobParts =
            hchDob.split('/');

          if (
            dobParts.length === 3
          ) {
            const day =
              dobParts[0];

            const month =
              dobParts[1];

            const buddhistYear =
              Number(
                dobParts[2],
              );

            if (
              day &&
              month &&
              !Number.isNaN(
                buddhistYear,
              )
            ) {
              dob =
                `${buddhistYear - 543}-` +
                `${month.padStart(2, '0')}-` +
                `${day.padStart(2, '0')}`;
            }
          }

          this.logger.log(
            `HCH Intra GetPatientSSO completed, eligible=${eligible}`,
          );

          return {
            eligible,
            patient: {
              ssoid,
              title:
                patientInfo?.title ??
                '',
              firstname:
                patientInfo?.firstname ??
                '',
              lastname:
                patientInfo?.lastname ??
                '',
              FullName:
                patientInfo?.FullName ??
                '',
              DOB: dob,
              Gender:
                patientInfo?.Gender ??
                '',
            },
          };
        } catch (
          fallbackError: unknown
        ) {
          handleHisTransportError(
            fallbackError,
            this.logger,
            'HCH Intra GetPatientSSO',
          );
        }
      }
    }

    /*
     * Other NHSO transport errors
     */
    handleHisTransportError(
      error,
      this.logger,
      'NHSO right-search',
    );
  }
}
  private removeEmptyFields<T>(
    obj: T,
  ): T {
    if (
      obj === null ||
      obj === undefined
    ) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj
        .map((item) =>
          this.removeEmptyFields(item),
        )
        .filter((item) => {
          if (
            item === null ||
            item === undefined
          ) {
            return false;
          }

          if (
            typeof item === 'object' &&
            !Array.isArray(item)
          ) {
            return (
              Object.keys(item).length > 0
            );
          }

          return true;
        }) as T;
    }

    if (
      typeof obj === 'object'
    ) {
      return Object.entries(obj)
        .reduce(
          (
            acc,
            [key, value],
          ) => {
            if (
              value === '' ||
              value === undefined ||
              value === null
            ) {
              return acc;
            }

            const cleanedValue =
              this.removeEmptyFields(
                value,
              );

            if (
              Array.isArray(
                cleanedValue,
              ) &&
              cleanedValue.length === 0
            ) {
              return acc;
            }

            if (
              typeof cleanedValue ===
              'object' &&
              cleanedValue !== null &&
              !Array.isArray(
                cleanedValue,
              ) &&
              Object.keys(
                cleanedValue,
              ).length === 0
            ) {
              return acc;
            }

            acc[key] =
              cleanedValue;

            return acc;
          },
          {} as Record<
            string,
            unknown
          >,
        ) as T;
    }

    return obj;
  }
  
}