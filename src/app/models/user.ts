import { Branch } from "./branch";
import { Employee } from "./employee";
import { Role } from "./role";

export interface User {
  id: number;
  username : string;
  password: string;
  createdAt: string;
  active: boolean;
  branch: Branch;
  employee: Employee;
  roles: [ Role ]
}
