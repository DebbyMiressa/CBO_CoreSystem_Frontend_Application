import { Division } from "./division";
import { Employee } from "./employee";

export interface Authority {
    id: number;
    employee: Employee;
    division: Division;
    active: boolean;
}
