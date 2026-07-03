import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'doctor_img',
})
export class DoctorImage {
  @PrimaryGeneratedColumn({
    name: 'docimg_id',
  })
  docimg_id!: number;

  @Column({
    name: 'doctor_id',
    type: 'int',
  })
  doctor_id!: number;

  @Column({
    name: 'docimg_name',
    type: 'varchar',
    length: 255,
  })
  docimg_name!: string;
}