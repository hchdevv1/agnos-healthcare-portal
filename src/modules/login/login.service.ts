import {
  BadGatewayException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { LoginRepository } from './repositories/login.repository';

import { LoginRequestDto } from './dto/login-request.dto';
import {
  LoginResponseDto,
  LoginResultDto,
} from './dto/login-response.dto';

import { handleHisBusinessResponse } from '../../common/utils/his-response-handler';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    private readonly loginRepository: LoginRepository,
  ) {}

  async login(
    loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const response =
      await this.loginRepository.login(
        loginRequestDto,
      );

    if (!response) {
      this.logger.error(
        'TRAKCARE Login returned empty response',
      );

      throw new BadGatewayException(
        'Invalid response from authentication service',
      );
    }

    handleHisBusinessResponse(
      response,
      this.logger,
      'TRAKCARE Login',
    );

    if (
      typeof response.staff_fullname !== 'string'
    ) {
      this.logger.error(
        'TRAKCARE Login returned malformed payload',
      );

      throw new BadGatewayException(
        'Malformed response from authentication service',
      );
    }

    const result: LoginResultDto = {
      staff_fullname:
        response.staff_fullname,
    };

    this.logger.log(
      `Login success for username: ${loginRequestDto.Username}`,
    );

    return {
      StatusCode: response.StatusCode,
      result,
    };
  }
}