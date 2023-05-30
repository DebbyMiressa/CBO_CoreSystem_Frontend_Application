import { NumberInput } from "@angular/cdk/coercion";
import { ListFormat } from "typescript/lib/tsserverlibrary";

export interface DashboardV {
    newUsers: Array<number>;
    allUsers: number;
    activeAuth: number;
    allAuth: number;
    recentUsers: Array<{name:String, lastlogin:String, role:string}>;
    roleVisit: {admin:number, director:number, nuser:number};
    todayLogin: number;
    pageViewToday: number;
    maleUsers: number;
    femaleUsers: number;
    allEmployee: number;
    allDivision: number;
}