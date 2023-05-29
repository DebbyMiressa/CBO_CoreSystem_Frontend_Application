export interface FraudSummary {
  id: number,
  categoryId: number,
  otherCategory: string,
  fraudTypeId: number,
  otherFraudType: string,
  outstandingCaseAsOfPreviousQuarter: {
    count: number,
    amount: number
  },
  newCaseDuringCurrentQuarter: {
    count: number,
    amount: number
  },
  closedCasesDuringCurrentQuarter: {
    count: number,
    amount: number
  },
  outstandingCaseAsOfCurrentQuarter: {
    count: number,
    amount: number
  },
  totalAmountRecovered: number,
  provisionForOutstandingCases: string,
  amountRecoveredInCurrentQuarter: number,
  amountWrittenOffInCurrentQuarter: string,
}
