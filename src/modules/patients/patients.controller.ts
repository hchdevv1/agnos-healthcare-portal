import { Controller, Body, HttpCode, HttpStatus, Post,Put ,Patch} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags ,ApiExcludeEndpoint, } from '@nestjs/swagger';
import { SearchPatientDto } from './dto/search-patient.dto';
import { SearchPatientResponseDto } from './dto/search-patient-response.dto';
import { CreatePatientResponseDto } from './dto/create-patient-response.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatchPatientDto } from './dto/patch-patient.dto';
import { SsoEligibleDto } from './dto/sso-eligible.dto';
import { SsoEligibleResponseDto } from './dto/sso-eligible-response.dto';
import { GetPatientImageDto } from './dto/get-patient-image.dto';
import { GetPatientImageResponseDto } from './dto/get-patient-image-response.dto';
import { UpdatePatientImageDto } from './dto/update-patient-image.dto';
import { UpdatePatientImageResponseDto } from './dto/update-patient-image-response.dto';

@ApiTags('Patients')

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }
  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search patients',
    description:
      'Search patient information using demographic and identification criteria.',
  })
  @ApiBody({
    type: SearchPatientDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Patient search completed successfully.',
    type: SearchPatientResponseDto,
    isArray: true,
  })
  async searchPatients(
    @Body() searchPatientDto: SearchPatientDto,
  ): Promise<SearchPatientResponseDto> {
    return this.patientsService.searchPatients(searchPatientDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create patient',
    description:
      'Create a new patient in external HIS system.',
  })
  @ApiBody({
    type: CreatePatientDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Patient created successfully.',
    type: CreatePatientResponseDto,
  })
  async createPatient(
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    return this.patientsService.createPatient(
      createPatientDto,
    );
  }

@ApiExcludeEndpoint()
@Put()

@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Update patient',
  description:
    'Update existing patient information in external HIS system.',
})
@ApiBody({
  type: UpdatePatientDto,
})
@ApiResponse({
  status: 200,
  description: 'Patient updated successfully.',
  type: CreatePatientResponseDto,
})
async updatePatient(
  @Body() updatePatientDto: UpdatePatientDto,
): Promise<CreatePatientResponseDto> {
  return this.patientsService.updatePatient(
    updatePatientDto,
  );
}

@Patch()
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Patch patient',
  description:
    'Partially update patient information in external HIS system.',
})
@ApiBody({
  type: PatchPatientDto,
})
@ApiResponse({
  status: 200,
  description:
    'Patient patched successfully.',
  type: CreatePatientResponseDto,
})
async patchPatient(
  @Body()
  patchPatientDto: PatchPatientDto,
): Promise<CreatePatientResponseDto> {
  return this.patientsService.patchPatient(
    patchPatientDto,
  );
}

@Post('sso-eligible')
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Check SSO eligibility',
  description:
    'Check patient information from NHSO using national ID.',
})
@ApiBody({
  type: SsoEligibleDto,
})
@ApiResponse({
  status: 200,
  description:
    'Patient information retrieved successfully.',
  type: SsoEligibleResponseDto,
})
async checkSsoEligible(
  @Body() ssoEligibleDto: SsoEligibleDto,
): Promise<SsoEligibleResponseDto> {
  return this.patientsService.checkSsoEligible(
    ssoEligibleDto,
  );
}
@Post('get-image')
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Get patient image',
  description:
    'Retrieve patient image from external HIS system using HN.',
})
@ApiBody({
  type: GetPatientImageDto,
})
@ApiResponse({
  status: 200,
  description:
    'Patient image retrieved successfully.',
  type: GetPatientImageResponseDto,
})
async getPatientImage(
  @Body() getPatientImageDto: GetPatientImageDto,
): Promise<GetPatientImageResponseDto> {
  return this.patientsService.getPatientImage(
    getPatientImageDto,
  );
}
@Post('update-image')
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Update patient image',
  description:
    'Update patient image in external HIS system.',
})
@ApiBody({
  type: UpdatePatientImageDto,
})
@ApiResponse({
  status: 200,
  description: 'Patient image updated successfully.',
  type: UpdatePatientImageResponseDto,
})
async updatePatientImage(
  @Body() updatePatientImageDto: UpdatePatientImageDto,
): Promise<UpdatePatientImageResponseDto> {
  return this.patientsService.updatePatientImage(
    updatePatientImageDto,
  );
}
}
