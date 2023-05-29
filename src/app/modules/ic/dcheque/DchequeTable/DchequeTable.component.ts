import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, Message, MessageService, PrimeNGConfig, SortEvent } from 'primeng/api';
import { DchequeService } from '../../../../services/dcheque.service';
import { BranchService } from '../../../../services/branch.service';
import { TimeService } from '../../../../services/time.service';
import { Dcheque } from 'src/app/models/dcheque';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-accordions',
  templateUrl: './DchequeTable.component.html',
  styleUrls: ['./DchequeTable.component.scss']
})
export class DchequeTableComponent {
  public dcheques: Dcheque[] = [];
  public dchequeR: Dcheque[] = [];
  selectedDcheque: Dcheque;
  deleteId: number = 0;
  msgs: Message[] = [];
  position: string;
  districtId: number;
  currentDate: Date;
  searchParameter: any[] =
    [
      { name: 'Branch Name', value: 'branch.name' },
      { name: 'District Name', value: 'branch.district.name' },
      { name: 'Date Presented', value: 'datePresented' },
      { name: 'Full Name of Drawer', value: 'fullNameOfDrawer' },
      { name: 'Account Number', value: 'accountNumber' },
      { name: 'TIN Number', value: 'tin' },
      { name: 'Drawer Address', value: 'drawerAddress' },
      { name: 'Amount in Birr', value: 'amountInBirr' },
      { name: 'Cheque Number', value: 'chequeNumber' },
      { name: 'Cheque Type', value: 'chequeType' },
      { name: 'Name of Beneficiary', value: 'nameOfBeneficiary' },
      { name: 'Frequency', value: 'frequency' }
    ];
  selectedSearchParameter: any;
  filterTable(target: any, dataTable: any) {
    if (this.selectedSearchParameter) {
      dataTable.filter(target?.value, this.selectedSearchParameter.value, 'contains');
    }
  }
  downloadExcel(tableID: string) {

    var table = document.getElementById(tableID);

    // converts a DOM TABLE element to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table, {raw:true});

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // save to file
    XLSX.writeFile(wb, 'Dcheques.xlsx');

  }

  minDate: Date;
  maxDate: Date;

  ngOnInit() {
    this.getDcheques(this.role);
    this.getCurrentDate();
    this.primengConfig.ripple = true;
  }

  filterByDate(dataTable: any) {
    dataTable.filter([this.minDate, this.maxDate], 'insuranceExpireDate', 'dateRange');
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

  constructor(private filterService: FilterService, private dchequeService: DchequeService, private branchService: BranchService, private router: Router, private confirmationService: ConfirmationService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig, private timeService: TimeService) { }

  updateDcheques(id: number): void {
    this.getDcheque(id);
    this.router.navigate(['updateDcheque', id]);
  }


  deleteBox(id: number): void {
    this.deleteId = id;

    this.dchequeService.deleteDcheque(this.deleteId).subscribe(
      (response: void) => {
        this.getDcheques(this.role);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        this.getDcheques(this.role);
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

  public getDcheques(role: string): void {
    if (role == "ROLE_IC_ADMIN") {
      this.dchequeService.getDcheques().subscribe(
        (response: Dcheque[]) => {
          this.dcheques = response;
          console.log("dcheque = ", this.dcheques)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log("BranchId = ", this.branchId);
        }
      );
    }
    else if (role == "ROLE_BRANCH_IC" || role == "ROLE_BRANCH_MANAGER") {
      this.dchequeService.getDchequeForBranch(this.branchId).subscribe(
        (response: Dcheque[]) => {
          this.dcheques = response;
          console.log("dcheque = ", this.dcheques)
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
      this.dchequeService.getDchequeForDistrict(this.districtId).subscribe(
        (response: Dcheque[]) => {
          this.dcheques = response;
          console.log("dcheque = ", this.dcheques)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log("BranchId = ", this.branchId);
        }
      );
    }
  }

  public deleteDcheque(): void {
    this.dchequeService.deleteDcheque(this.deleteId).subscribe(
      (response: void) => {
        this.getDcheques(this.role);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        this.getDcheques(this.role);
      }
    );
  }

  public getDcheque(id: number): Dcheque[] {
    this.dchequeService.getDcheque(id).subscribe(
      (response: Dcheque) => {
        this.dchequeR = [response];
        console.log(this.dchequeR)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    return this.dchequeR;
  }
}


