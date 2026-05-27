import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'doctor_type',
})
export class DoctorType {
  @PrimaryColumn({
    name: 'doctor_type_id',
  })
  doctor_type_id?: number;

  @Column({
    name: 'doctor_type_name',
  })
  doctor_type_name?: string;
}