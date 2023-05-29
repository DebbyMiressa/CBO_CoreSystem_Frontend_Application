import { Branch } from "./branch"
import { ChequeType} from './chequeType'
import { ActionTaken } from './actionTaken'

export interface Dcheque {
  datePresented: string,
  fullNameOfDrawer: string,
  accountNumber: string,
  drawerAddress: string,
  amountInBirr: string;
  actionTaken: ActionTaken,
  chequeNumber: string,
  frequency: string,
  tin: string,
  chequeType: ChequeType,
  nameOfBeneficiary: string,
  branch: Branch,
}
