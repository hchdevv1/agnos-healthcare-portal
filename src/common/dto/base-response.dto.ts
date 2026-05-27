import { ApiProperty } from '@nestjs/swagger';

export class ResponseStatusDto {
  @ApiProperty()
  code?: string;

  @ApiProperty()
  description?: string;
}

export class BaseResponseDto<T> {
  @ApiProperty()
  success?: boolean;

  @ApiProperty()
  statusCode?: number;

  @ApiProperty()
  message?: string;

  @ApiProperty({
    type: ResponseStatusDto,
  })
  responseStatus?: ResponseStatusDto;

  @ApiProperty()
  meta?: any;

  @ApiProperty()
  result?: T;
}