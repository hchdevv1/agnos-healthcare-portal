import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'doctorprofile_2',
})
export class DoctorProfile {
  @PrimaryGeneratedColumn({
    name: 'doctor_id',
  })
  doctor_id?: number;

  @Column({
    name: 'doctor_code',
  })
  doctor_code?: string;

  @Column({
    name: 'doctor_title_id',
    nullable: true,
  })
  doctor_title_id?: number;

  @Column({
    name: 'doctor_name',
    nullable: true,
  })
  doctor_name?: string;

  @Column({
    name: 'doctor_engname',
    nullable: true,
  })
  doctor_engname?: string;

  @Column({
    name: 'doctor_position_id',
    nullable: true,
  })
  doctor_position_id?: number;

  @Column({
    name: 'doctor_type_id',
    nullable: true,
  })
  doctor_type_id?: number;

  @Column({
    name: 'location_id',
    nullable: true,
  })
  location_id?: number;

  @Column({
    name: 'doctor_institution',
    nullable: true,
  })
  doctor_institution?: string;

  @Column({
    name: 'doctor_branch',
    nullable: true,
  })
  doctor_branch?: string;

  @Column({
    name: 'doctor_year',
    nullable: true,
  })
  doctor_year?: string;

  @Column({
    name: 'doctor_institution1',
    nullable: true,
  })
  doctor_institution1?: string;

  @Column({
    name: 'doctor_branch1',
    nullable: true,
  })
  doctor_branch1?: string;

  @Column({
    name: 'doctor_year1',
    nullable: true,
  })
  doctor_year1?: string;

  @Column({
    name: 'doctor_institution2',
    nullable: true,
  })
  doctor_institution2?: string;

  @Column({
    name: 'doctor_branch2',
    nullable: true,
  })
  doctor_branch2?: string;

  @Column({
    name: 'doctor_year2',
    nullable: true,
  })
  doctor_year2?: string;
}