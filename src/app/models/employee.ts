export interface Employee {
  id: number;
  givenName: string;
  fatherName: string;
  grandFatherName: string;
  gender: string;
  birthDate: string;
  email: string,
  cboEmail: string;
  position : string;
  phoneNumber: string;
  division: {
      id: number,
      name: string,
      parent: {
        id: number,
        name: string
      };
  };
}
