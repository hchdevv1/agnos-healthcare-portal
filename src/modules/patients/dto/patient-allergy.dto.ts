import { ApiPropertyOptional } from '@nestjs/swagger';

export class PatientAllergyDto {
  @ApiPropertyOptional({
    description: 'Allergy category',
    example: 'ADR Type A (Trade Name)',
  })
  Category?: string;

  @ApiPropertyOptional({
    description: 'Allergy substance',
    example: '',
  })
  Substance?: string;

  @ApiPropertyOptional({
    description: 'Allergy severity level',
    example: 'Mild non-allergic reaction',
  })
  Severity?: string;

  @ApiPropertyOptional({
    description: 'Side effect description',
    example: 'เกิดอาการข้างเคียง เล็กน้อย',
  })
  SideEffected?: string;

  @ApiPropertyOptional({
    description: 'Additional allergy comment',
    example: 'ท้องเสีย',
  })
  Comment?: string;
}