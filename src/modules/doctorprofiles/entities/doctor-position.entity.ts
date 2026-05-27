import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'emp_position',
})
export class DoctorPosition {
  @PrimaryColumn({
    name: 'position_id',
  })
  position_id?: number;

  @Column({
    name: 'position_name',
  })
  position_name?: string;
}