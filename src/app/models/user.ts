import { Branch } from "./branch";

export interface User {
  id: number;
  username : string;
  password: string;
  createdAt: string;
  active: boolean;
  branch: Branch;
  employee: {
      id: number,
      givenName: string,
      fatherName: string,
      grandFatherName: string,
      gender: string;
      birthDate: string;
      email: string;
      cboEmail: string;
      position : string,
      phoneNumber: string,
      division: {
          id: number,
          name: string,
          parent: {
            id: number,
            name: string
          };
      },
  }
  roles: [
      {
          id: number,
          name: string
      }
  ],
}
