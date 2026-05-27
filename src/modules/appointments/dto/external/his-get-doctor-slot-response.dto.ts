export class HisDoctorDto {
  Code?: string;

  Description?: string;

  OnlineAppointment?: boolean;
  
}
export class HisLocationDto {
  Code?: string;

  Description?: string;

  OnlineAppointment?: boolean;
}

export class HisSlotDto {
  ID?: string;

  Date?: string;

  StartTime?: string;

  EndTime?: string;

  NumberOfAvailable?: number;

  Status?: string;
}

export class HisSlotsDto {
  Slot?: HisSlotDto[];
}

export class HisScheduleDto {
  Doctor?: HisDoctorDto;

  Location?: HisLocationDto;

  Slots?: HisSlotsDto;
}

export class HisSchedulesDto {
  Schedule?: HisScheduleDto[];
}

export class HisGetDoctorSlotResultDto {
  Schedules?: HisSchedulesDto;
}

export class HisGetDoctorSlotResponseDto {
  Result?: HisGetDoctorSlotResultDto;
}