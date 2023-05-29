export interface DchequeP {
  datePresented: string,
  fullNameOfDrawer: string,
  accountNumber: string,
  drawerAddress: string,
  amountInBirr: string,
  actionTaken: {
    id: number
  },
  chequeNumber: string,
  frequency: string,
  tin: string,
  chequeType: {
    id: number
  },
  nameOfBeneficiary: string,
  branch: {
    id: number
  }
}
