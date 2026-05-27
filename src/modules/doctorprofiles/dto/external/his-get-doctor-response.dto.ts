export class HisDoctorItemDto {
  LocationCode?: string;
  doctorcode?: string;
  doctorname?: string;
  specialtycode?: string;
  specialtyname?: string;
  subspecialtycode?: string;
  subspecialtyname?: string;
  flag?: string;
}

export class HisGetDoctorResponseDto {
  Doctors?: HisDoctorItemDto[];
}