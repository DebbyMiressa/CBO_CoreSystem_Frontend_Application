import { Division } from "./division";
import { Employee } from "./employee";

export interface AuthorityC {
    id: number;
    employee: Employee;
    division: Division;
    stamp: String;
    signature: String;
    active: boolean
}
