import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, Message, MessageService, PrimeNGConfig, SortEvent } from 'primeng/api';
import { FraudService } from '../../../services/fraud.service';
import { BranchService } from '../../../services/branch.service';
import { TimeService } from '../../../services/time.service';
import { Fraud } from 'src/app/models/fraud';
import { FraudSummary } from 'src/app/models/fraudSummary';
import * as XLSX from 'xlsx';
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

@Component({
  selector: 'app-accordions',
  templateUrl: './FraudNBETable.component.html',
  styleUrls: ['./FraudNBETable.component.scss']
})
export class FraudNBETableComponent {

  public frauds: Fraud[] = [];
  public fraudSummaries: FraudSummary[] = [];
  public selectedFraudSummary: FraudSummary;

  counter: number = 0;
  flag: Boolean = false;
  fraudSummariesFlagId: number = 0;
  branchId: number = Number(localStorage.getItem('branchId'));

  fraudCategories: any[] = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Deposit' },
    { id: 3, name: 'Loan' },
    { id: 4, name: 'Forex' },
    { id: 5, name: 'Interbank Account' },
    { id: 6, name: 'Clearing' },
    { id: 7, name: 'Off Balance Sheet' },
    { id: 8, name: 'Cheques/DDs' },
    { id: 9, name: 'Other' }
  ];

  fraudTypes: any[] = [
    { id: 1, name: 'Embezzlement' },
    { id: 2, name: 'Cheating' },
    { id: 3, name: 'Forgery' },
    { id: 4, name: 'Other' },
  ]

  ngOnInit() {
    this.fraudSummary();
    this.primengConfig.ripple = true;
  }

  fraudSummary(): void {
    this.fraudService.getFrauds().subscribe(
      async (response: Fraud[]) => {
        this.frauds = response;
        let i = 0, j = 0;
        for (i = 0; i < this.frauds.length; i++) {
          for (j = 0; j < this.counter; j++) {
            if (this.fraudSummaries[j].categoryId == this.frauds[i].fraudCategory.id && this.fraudSummaries[j].fraudTypeId == this.frauds[i].fraudType.id) {
              if (this.frauds[i].fraudCategory.name == 'Other' && this.frauds[i].fraudType.name == 'Other')
                if (this.fraudSummaries[j].otherCategory !== this.frauds[i].otherFraudCategory || this.fraudSummaries[j].otherFraudType !== this.frauds[i].otherFraudType)
                  continue;
              if (this.frauds[i].fraudCategory.name == 'Other' && this.fraudSummaries[j].otherCategory !== this.frauds[i].otherFraudCategory)
                continue;
              if (this.frauds[i].fraudType.name == 'Other' && this.fraudSummaries[j].otherFraudType !== this.frauds[i].otherFraudType)
                continue;
              this.flag = true;
              break;
            }
          }
          if (this.flag == false) {
            let count1 = 0, count2 = 0, count3 = 0, count4 = 0;
            let amount1 = 0, amount2 = 0, amount3 = 0, amount4 = 0;
            await this.isTheCaseReportedInPreviousQuarter(this.frauds[i].caseId).then(async (result1) => {
              if (this.frauds[i].caseStatus.name == 'Outstanding' && result1) {
                count1 = 1;
                amount1 = Number(this.frauds[i].fraudAmount);
              }
              await this.isTheCaseReportedInCurrentQuarter(this.frauds[i].caseId).then((result2) => {
                if (result2) {
                  count2 = 1;
                  amount2 = Number(this.frauds[i].fraudAmount);
                }
                if (this.frauds[i].caseStatus.name == 'Closed' && result2) {
                  count3 = 1;
                  amount3 = Number(this.frauds[i].fraudAmount);
                }
                if (this.frauds[i].caseStatus.name == 'Outstanding' && result2) {
                  count4 = 1;
                  amount4 = Number(this.frauds[i].fraudAmount);
                }
                this.fraudSummaries.push({
                  id: this.counter + 1,
                  categoryId: this.frauds[i].fraudCategory.id,
                  otherCategory: this.frauds[i].otherFraudCategory,
                  fraudTypeId: this.frauds[i].fraudType.id,
                  otherFraudType: this.frauds[i].otherFraudType,
                  outstandingCaseAsOfPreviousQuarter: {
                    count: count1,
                    amount: amount1,
                  },
                  newCaseDuringCurrentQuarter: {
                    count: count2,
                    amount: amount2,
                  },
                  closedCasesDuringCurrentQuarter: {
                    count: count3,
                    amount: amount3,
                  },
                  outstandingCaseAsOfCurrentQuarter: {
                    count: count4,
                    amount: amount4,
                  },
                  totalAmountRecovered: Number(this.frauds[i].amountRecovered),
                  provisionForOutstandingCases: "unknown",
                  amountRecoveredInCurrentQuarter: result2 ? Number(this.frauds[i].amountRecovered) : 0,
                  amountWrittenOffInCurrentQuarter: "unknown"
                });
              })
            })
            this.counter++;
          }
          else {
            await this.isTheCaseReportedInPreviousQuarter(this.frauds[i].caseId).then(async (result1) => {
              if (this.frauds[i].caseStatus.name == 'Outstanding' && result1) {
                this.fraudSummaries[j].outstandingCaseAsOfPreviousQuarter.count += 1;
                this.fraudSummaries[j].outstandingCaseAsOfPreviousQuarter.amount += Number(this.frauds[i].fraudAmount);
              }
              await this.isTheCaseReportedInCurrentQuarter(this.frauds[i].caseId).then((result2) => {
                if (result2) {
                  this.fraudSummaries[j].newCaseDuringCurrentQuarter.count += 1;
                  this.fraudSummaries[j].newCaseDuringCurrentQuarter.amount += Number(this.frauds[i].fraudAmount);
                }
                if (this.frauds[i].caseStatus.name == 'Closed' && result2) {
                  this.fraudSummaries[j].closedCasesDuringCurrentQuarter.count += 1;
                  this.fraudSummaries[j].closedCasesDuringCurrentQuarter.amount += Number(this.frauds[i].fraudAmount);
                }
                if (this.frauds[i].caseStatus.name == 'Outstanding' && result2) {
                  this.fraudSummaries[j].outstandingCaseAsOfCurrentQuarter.count += 1;
                  this.fraudSummaries[j].outstandingCaseAsOfCurrentQuarter.amount += Number(this.frauds[i].fraudAmount);
                }
                this.fraudSummaries[j].totalAmountRecovered += Number(this.frauds[i].amountRecovered);
                this.fraudSummaries[j].provisionForOutstandingCases = "unknown";
                if (result2) {
                  this.fraudSummaries[j].amountRecoveredInCurrentQuarter += Number(this.frauds[i].amountRecovered);
                }
                this.fraudSummaries[j].amountWrittenOffInCurrentQuarter = "unknown";
                this.flag = false;
              })
            })
          }
        }
      }
    );
  }

  async isTheCaseReportedInPreviousQuarter(caseId: string): Promise<boolean> {
    const caseDate = new Date(parseInt(caseId.split('/')[3]), parseInt(caseId.split('/')[1]) - 1, parseInt(caseId.split('/')[2]));
    let currentDate, currentYear, currentQuarter, lastQuarter, lastQuarterStart, lastQuarterEnd;
    return new Promise(async (resolve) => {
      try {
        const response = await this.timeService.getDate();
        currentDate = new Date();
        currentYear = currentDate.getFullYear();
        currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
        lastQuarter = (currentQuarter == 1) ? 4 : currentQuarter - 1;
        lastQuarterStart = new Date(currentYear, lastQuarter * 3 - 3, 1);
        lastQuarterEnd = (lastQuarter * 3 == 3 || lastQuarter * 3 == 12) ? new Date(currentYear, lastQuarter * 3 - 1, 31) : new Date(currentYear, lastQuarter * 3 - 1, 30);
        resolve(caseDate >= lastQuarterStart && caseDate <= lastQuarterEnd);
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  async isTheCaseReportedInCurrentQuarter(caseId: string): Promise<boolean> {
    const caseDate = new Date(parseInt(caseId.split('/')[3]), parseInt(caseId.split('/')[1]) - 1, parseInt(caseId.split('/')[2]));
    let currentDate, currentYear, currentQuarter, currentQuarterStart, currentQuarterEnd;
    return new Promise(async (resolve) => {
      try {
        const response = await this.timeService.getDate();
        currentDate = new Date();
        currentYear = currentDate.getFullYear();
        currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
        currentQuarterStart = new Date(currentYear, currentQuarter * 3 - 3, 1);
        currentQuarterEnd = (currentQuarter * 3 == 3 || currentQuarter * 3 == 12) ? new Date(currentYear, currentQuarter * 3 - 1, 31) : new Date(currentYear, currentQuarter * 3 - 1, 30);
        resolve(caseDate >= currentQuarterStart && caseDate <= currentQuarterEnd);
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  addTrailingZeros(str: string): string {
    const decimalIndex = str.indexOf('.');
    if (decimalIndex === -1) {
      return `${str}.00`;
    }
    const decimalPlaces = str.length - decimalIndex - 1;
    if (decimalPlaces === 0) {
      return `${str}00`;
    } else if (decimalPlaces === 1) {
      return `${str}0`;
    }
    return str;
  }

  downloadExcel(tableID: string) {

    var table = document.getElementById(tableID);

    // converts a DOM TABLE element to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table, { raw: true });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // save to file
    XLSX.writeFile(wb, 'IncidentFraudReportToNBE.xlsx');

  }

  constructor(private fraudService: FraudService, private primengConfig: PrimeNGConfig, private timeService: TimeService) { }
}


