import { Division } from "./division";

export interface AuthorityC {
    id: number;
    employee: {
        id: number;
        givenName: string;
        fatherName: string;
        grandFatherName: string;
        cboEmail : string;
        position : string;
        email: string;
        phoneNumber: string;
        division: {
            id: number,
            name: string,
            parent: Division
        }
    };
    division: {
        id: number;
        name: string;
        parent: {
            id: string,
            name: string
        }
    };
    stamp: String;
    signature: String;
    active: boolean
}
