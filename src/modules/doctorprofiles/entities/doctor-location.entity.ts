import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'doctor_location2',
})
export class DoctorLocation {
  @PrimaryColumn({
    name: 'location_id',
  })
  location_id?: number;

  @Column({
    name: 'his_ref_codes',
  })
  his_ref_codes?: string;
}