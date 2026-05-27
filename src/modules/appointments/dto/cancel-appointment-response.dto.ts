import { ApiProperty } from '@nestjs/swagger';

export class CancelAppointmentItemDto {
  @ApiProperty({
    example: '8560||19659||1',
  })
  appointmentId?: string;

  @ApiProperty({
    example: '2026-05-19',
  })
  appointmentDate?: string;

  @ApiProperty({
    example: '08:00',
  })
  appointmentTime?: string;

  @ApiProperty({
    example: 'Cancelled',
  })
  appointmentStatus?: string;
}

export class CancelAppointmentResponseDto {
  @ApiProperty({
    example: '60-019471',
  })
  hn?: string;

  @ApiProperty({
    type: CancelAppointmentItemDto,
  })
  appointment?: CancelAppointmentItemDto;
}