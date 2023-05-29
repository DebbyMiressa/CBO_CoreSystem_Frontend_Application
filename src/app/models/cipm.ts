export interface CIPM {
  id: number;
  borrowerName:string,
  mortgagorName:string,
  loanAccount:string,
  loanType:string,
  collateralType:{
      id: number
   },
  otherCollateralType: string,
  insurancePolicyCoverageType:{
      id: number
  },
  otherInsurancePolicyCoverageType: string,
  insuredName:string,
  insuranceExpireDate:string,
  branch:{
      id:number
  }
}

