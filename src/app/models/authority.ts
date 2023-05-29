export interface Authority {
    id: number;
    employee: {
        id: number;
    givenName: string;
    fatherName: string;
    grandFatherName: string;
    position : string;
    email: string;
    phoneNumber: string;
    division: {
        id: number,
        name: string,
        parent: number;
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

    active: boolean;
}
