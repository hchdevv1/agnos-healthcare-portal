import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { LoginService } from './login.service';

import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Authenticate hospital staff',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid username or password',
  })
  async login(
    @Body()
    loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.loginService.login(
      loginRequestDto,
    );
  }
}