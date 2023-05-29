import { Branch } from "./branch"
import { SuspectedFraudsterProfession} from './suspectedFraudsterProfession'
import { CaseStatus } from './caseStatus'
import { FraudCategory } from './fraudCategory'
import { FraudType } from './fraudType'

export interface Fraud {
  id: number,
  caseId: string,
  caseStatus: CaseStatus,
  caseAuthorized: boolean,
  fraudCause: string,
  fraudAmount: string,
  fraudCategory: FraudCategory,
  otherFraudCategory: string,
  fraudType: FraudType,
  otherFraudType: string,
  fraudOccuranceDate: string,
  fraudDetectionDate: string;
  fraudOccurancePlace: string,
  fraudCommitingTechnique: string,
  reasonForDelay: string,
  reasonForFailedFraudAttempt: string,
  amountRecovered: string,
  actionTaken: string,
  suspectedFraudsterAddress: string,
  suspectedFraudsterName: string,
  suspectedFraudsterProfession: SuspectedFraudsterProfession,
  otherSuspectedFraudsterProfession: string,
  otherComment: string,
  branch: Branch,
}
