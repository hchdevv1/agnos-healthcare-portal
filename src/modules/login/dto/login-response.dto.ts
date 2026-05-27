import { ApiProperty } from '@nestjs/swagger';

export class LoginResultDto {
  @ApiProperty({
    example: 'นาย กฤษณ์ จันทรวงศ์',
  })
  staff_fullname?: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 200,
  })
  StatusCode?: number;

  @ApiProperty({
    type: LoginResultDto,
  })
  result?: LoginResultDto;
}