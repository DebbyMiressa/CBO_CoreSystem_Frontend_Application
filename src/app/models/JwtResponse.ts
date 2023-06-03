import { Division } from "./division";

export interface JwtResponse {
    user: {
        id: number,
        username: string;
        password: string;

        branch: {
            id: number;
            code: string;
            name: string;
            mnemonic: string;
            location: string;
            district: {
                id: number;
                name: string;
            }
        };
        employee: {
            id: 6,
            givenName: string,
            fatherName: string,
            grandFatherName: string,
            position: string,
            phoneNumber: string,
            email: string;
            cboemail: string;
            division: {
                id: number;
                name: string;
                parent: Division;
            }
        };
        modules: [
          {
            id: number,
            name: string,
            url: string,
            status: boolean
          }
        ];
        roles: [
            {
                id: number;
                name: string;
            }
        ];
    };
    accessToken: string;
}
