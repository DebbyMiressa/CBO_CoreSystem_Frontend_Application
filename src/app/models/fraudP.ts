export interface FraudP {
  caseId: string,
  caseStatus: {
    id: number
  },
  caseAuthorized: boolean,
  fraudCause: string,
  fraudAmount: string,
  fraudCategory: {
    id: number
  },
  otherFraudCategory: string,
  fraudType: {
    id: number
  },
  otherFraudType: string,
  fraudOccuranceDate: string,
  fraudDetectionDate: string,
  fraudOccurancePlace: string,
  fraudCommitingTechnique: string,
  reasonForDelay: string,
  reasonForFailedFraudAttempt: string,
  amountRecovered: string,
  actionTaken: string,
  suspectedFraudsterAddress: string,
  suspectedFraudsterName: string,
  suspectedFraudsterProfession: {
    id: number
  },
  otherSuspectedFraudsterProfession: string,
  otherComment: string,
  branch: {
    id: number
  },
}
