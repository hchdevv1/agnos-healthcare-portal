import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    example: 1,
  })
  page?: number;

  @ApiProperty({
    example: 20,
  })
  limit?: number;

  @ApiProperty({
    example: 120,
  })
  total?: number;

  @ApiProperty({
    example: 6,
  })
  totalPages?: number;
}