import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'emp_title',
})
export class DoctorTitle {
  @PrimaryColumn({
    name: 'title_id',
  })
  title_id?: number;

  @Column({
    name: 'title_name',
  })
  title_name?: string;
}