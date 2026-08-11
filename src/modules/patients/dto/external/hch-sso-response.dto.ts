export interface HchSsoPatientInfo {
  ssoid?: string;
  PIDorPassport?: string;
  title?: string;
  firstname?: string;
  lastname?: string;
  FullName?: string;
  ActiveDate?: string;
  PatientID?: string;
  HN?: string;
  DOB?: string;
  Age?: string;
  Gender?: string;
  MobilePhone?: string;
  UpdateDate?: string;
  ExpiryDate?: string;
}

export interface HchSsoResponse {
  PatientInfo?: HchSsoPatientInfo;
}