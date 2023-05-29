import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, Message, MessageService, PrimeNGConfig, SortEvent } from 'primeng/api';
import { FraudService } from '../../../services/fraud.service';
import { BranchService } from '../../../services/branch.service';
import { TimeService } from '../../../services/time.service';
import { Fraud } from 'src/app/models/fraud';
import * as XLSX from 'xlsx';
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

@Component({
  selector: 'app-accordions',
  templateUrl: './FraudTable.component.html',
  styleUrls: ['./FraudTable.component.scss']
})
export class FraudTableComponent {

  downloadExcel(tableID: string) {

    var table = document.getElementById(tableID);

    // converts a DOM TABLE element to a worksheet
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(table, {raw:true});

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // save to file
    XLSX.writeFile(wb, 'IncidentFraudReport.xlsx');

  }

  public frauds: Fraud[] = [];
  public fraudR: Fraud[] = [];
  public fraud: Fraud;
  selectedFraud: Fraud;
  deleteId: number = 0;
  msgs: Message[] = [];
  position: string;
  districtId: number;
  currentDate: Date;
  searchParameter: any[] =
    [
      { name: 'Case ID', value: 'caseId' },
      { name: 'Case Status', value: 'caseStatus.name' },
      { name: 'Fraud Cause', value: 'fraudCause' },
      { name: 'Fraud Amount', value: 'fraudAmount' },
      { name: 'Fraud Category', value: 'fraudCategory.name' },
      { name: 'Other Fraud Category', value: 'otherFraudCategory' },
      { name: 'Fraud Type', value: 'fraudType.name' },
      { name: 'Other Fraud Type', value: 'otherFraudType' },
      { name: 'Fraud Occurance Date', value: 'fraudOccuranceDate' },
      { name: 'Fraud Detection Date', value: 'fraudDetectionDate' },
      { name: 'Fraud Occurance Place', value: 'fraudOccurancePlace' },
      { name: 'Fraud Commting Technique', value: 'fraudCommitingTechnique' },
      { name: 'Delay Reason', value: 'reasonForDelay' },
      { name: 'Failed Attempt Reason', value: 'reasonForFailedFraudAttempt' },
      { name: 'Amount Recovered', value: 'amountRecovered' },
      { name: 'Action Taken', value: 'actionTaken' },
      { name: 'Fraudster Address', value: 'suspectedFraudsterAddress' },
      { name: 'Fraudster Name', value: 'suspectedFraudsterName' },
      { name: 'Fraudster Profession', value: 'suspectedFraudsterProfession.name' },
      { name: 'Other Fraudster Profession', value: 'otherSuspectedFraudsterProfession' },
      { name: 'Other Information', value: 'otherComment' },
      { name: 'Branch Name', value: 'branch.name' }
    ];
  selectedSearchParameter: any;
  filterTable(target: any, dataTable: any) {
    if (this.selectedSearchParameter) {
      dataTable.filter(target?.value, this.selectedSearchParameter.value, 'contains');
    }
  }

  minDate: Date;
  maxDate: Date;

  ngOnInit() {
    this.getFrauds(this.role);
    console.log("Role = ", this.role);
    this.getCurrentDate();
    this.primengConfig.ripple = true;
  }

  filterByDate(dataTable: any) {
    dataTable.filter([this.minDate, this.maxDate], 'insuranceExpireDate', 'dateRange');
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

  getCurrentDate(): void {
    this.timeService.getDate().subscribe(
      (response: any) => {
        this.currentDate = new Date(response.time);
      }
    );
  }

  calculateDaysLeftToExpire(expiryDate: string): number {
    let date = new Date(expiryDate);
    let daysLeftToExpire = (date.getTime() - this.currentDate.getTime()) / (1000 * 3600 * 24);
    return Math.ceil(daysLeftToExpire);
  }

  millisFromNowTo(expiryDate: string): string {
    console.log(expiryDate)
    return (this.calculateDaysLeftToExpire(expiryDate)).toString();
  }

  absoluteValue(number: number): number {
    return Math.abs(number);
  }

  branchId: number = Number(localStorage.getItem('branchId'));
  role: string = localStorage.getItem('role');

  constructor(private filterService: FilterService, private fraudService: FraudService, private branchService: BranchService, private router: Router, private confirmationService: ConfirmationService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig, private timeService: TimeService) { }

  updateFrauds(id: number): void {
    this.getFraud(id);
    this.router.navigate(['updateFraud', id]);
  }

  authorizeFrauds(id: number): void {
    this.fraudService.authorizeFraud(id).subscribe(
      (response: Fraud) => {
        this.getFrauds(this.role);
      }
    );
  }

  deleteBox(id: number): void {
    this.deleteId = id;

    this.fraudService.deleteFraud(this.deleteId).subscribe(
      (response: void) => {
        this.getFrauds(this.role);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        this.getFrauds(this.role);
      }
    );

  }

  confirmPosition(position: string, id: number) {
    this.position = position;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteBox(id);
        this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'Record deleted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'error', summary: 'Rejected', detail: 'Record not deleted' }];
      },
      key: "positionDialog"
    });
  }

  public getFrauds(role: string): void {
    if (role == "ROLE_IC_ADMIN") {
      this.fraudService.getFrauds().subscribe(
        (response: Fraud[]) => {
          this.frauds = response;
          console.log("fraud = ", this.frauds)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log("BranchId = ", this.branchId);
        }
      );
    }
    else if (role == "ROLE_BRANCH_IC" || role == "ROLE_BRANCH_MANAGER") {
      this.fraudService.getFraudForBranch(this.branchId).subscribe(
        (response: Fraud[]) => {
          this.frauds = response;
          console.log("fraud = ", this.frauds)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log("BranchId = ", this.branchId);
        }
      );
    }
    else if (role == "ROLE_DISTRICT_IC") {
      this.branchService.getBranch(this.branchId).subscribe(branch => {
        this.districtId = branch?.district?.id
      });
      this.fraudService.getFraudForDistrict(this.districtId).subscribe(
        (response: Fraud[]) => {
          this.frauds = response;
          console.log("fraud = ", this.frauds)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log("BranchId = ", this.branchId);
        }
      );
    }
  }

  public deleteFraud(): void {
    this.fraudService.deleteFraud(this.deleteId).subscribe(
      (response: void) => {
        this.getFrauds(this.role);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        this.getFrauds(this.role);
      }
    );
  }

  public getFraud(id: number): Fraud[] {
    this.fraudService.getFraud(id).subscribe(
      (response: Fraud) => {
        this.fraudR = [response];
        console.log(this.fraudR)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    return this.fraudR;
  }
}


