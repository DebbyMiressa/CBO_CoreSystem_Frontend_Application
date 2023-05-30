import { Division } from "./division";

export interface Employee {
  id: number;
  givenName: string;
  fatherName: string;
  grandFatherName: string;
  position : string;
  email: string,
  cboEmail: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  signatureImage:string;
  employeeImage: string;
  division: Division;
}
