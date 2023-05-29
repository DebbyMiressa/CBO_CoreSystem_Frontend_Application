import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, Message, MessageService, PrimeNGConfig, SortEvent } from 'primeng/api';
import { CIPM } from '../../../../models/cipm';
import { CIPMService } from '../../../../services/cipm.service';
import { BranchService } from '../../../../services/branch.service';
import { TimeService } from '../../../../services/time.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-accordions',
  templateUrl: './CIPMTable.component.html',
  styleUrls: ['./CIPMTable.component.scss']
})
export class CIPMTableComponent {
  public cipms: CIPM[] = [];
  public cipmR: CIPM[] = [];
  selectedCIPM: CIPM;
  deleteId: number = 0;
  msgs: Message[] = [];
  position: string;
  districtId: number;
  searchParameter: any[] =
  [
    {name: 'Branch Name', value: 'branch.name'},
    {name: 'District Name', value: 'branch.district.name'},
    {name: 'Collateral Type', value: 'collateralType.name'},
    {name: 'Other Collateral Type', value: 'otherCollateralType'},
    {name: 'Insurance Policy Coverage Type', value: 'insurancePolicyCoverageType.name'},
    {name: 'Other Insurance Policy Coverage Type', value: 'otherInsurancePolicyCoverageType'},
    {name: 'Insurance Expiry Date', value: 'insuranceExpireDate'},
    {name: 'Borrower Name', value: 'borrowerName'},
    {name: 'Mortgagor Name', value: 'mortgagorName'},
    {name: 'Loan Account', value: 'loanAccount'},
    {name: 'Loan Type', value: 'loanType'},
    {name: 'Insured Name', value: 'insuredName'}
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
    XLSX.writeFile(wb, 'CIPM.xlsx');

  }

  minDate: Date;
  maxDate: Date;
  currentDate: Date;

  ngOnInit(){
    console.log(this.role)
    this.getCurrentDate();
    this.getCIPMs(this.role);
    this.primengConfig.ripple = true;
    console.log("Min Date = ",this.minDate)
    this.filterService.register('dateRange', (value: any, filter: any): boolean => {
      // convert value and filter to date objects
      let dateValue = new Date(value);
      let minFilter = new Date(filter[0]);
      let maxFilter = new Date(filter[1]);
      if (this.minDate == undefined && this.maxDate == undefined) {
        return true;
      }
      // if both min and max dates are specified, check if value is between them
      if (filter[0] && filter[1]) {
        return dateValue >= minFilter && dateValue <= maxFilter;
      }

      // if only min date is specified, check if value is greater than or equal to it
      if (filter[0] && !filter[1]) {
        return dateValue >= minFilter;
      }

      // if only max date is specified, check if value is less than or equal to it
      if (!filter[0] && filter[1]) {
        return dateValue <= maxFilter;
      }

      // if no dates are specified, return true for all values
      return true;
    });
  }

filterByDate(dataTable: any) {
  dataTable.filter([this.minDate, this.maxDate], 'insuranceExpireDate', 'dateRange');
}

getCurrentDate() {
  this.timeService.getDate().subscribe(
    (response: any) => {
      console.log(response.time)
      this.currentDate = new Date(response.time);
      console.log(this.currentDate)
    }
  );
  }

  calculateDaysLeftToExpire(expiryDate: string): number {
    let date = new Date(expiryDate);
    let daysLeftToExpire = (date.getTime() - this.currentDate.getTime())/(1000 * 3600 * 24);
    return Math.ceil(daysLeftToExpire);
  }

  millisFromNowTo(expiryDate: string) : string {
    console.log(expiryDate)
    return (this.calculateDaysLeftToExpire(expiryDate)).toString();
  }

  customSort(event: SortEvent) {
    // event.field is the field name to sort by // event.order is 1 for ascending and -1 for descending
    // this.cipms is your data array

    this.cipms.sort((a, b) => {
      // check which field to sort by
      if (event.field === "insuranceExpireDate") {
        // convert strings to dates
        let dateA = new Date(a[event.field]);
        let dateB = new Date(b[event.field]);
        // compare dates
        return (dateA.getTime() - dateB.getTime()) * event.order;
      } else if (event.field === "daysLeftToExpire") {
        // get days difference using absoluteValue and calculateDaysLeftToExpire
        let diffA = (this.calculateDaysLeftToExpire(a["insuranceExpireDate"]));
        let diffB = (this.calculateDaysLeftToExpire(b["insuranceExpireDate"]));
        // compare differences
        return (diffA - diffB) * event.order;
      } else {
        // use default sorting logic
          let valueA = a[event.field];
          let valueB = b[event.field];
          return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * event.order;
      }
    });

  }

  convertToLocalString(expiryDate: string): string {
    let date = new Date(expiryDate);
    console.log('local date = ', date);
    console.log(expiryDate)
    return date.toLocaleDateString();
  }

  absoluteValue(number: number): number {
    return Math.abs(number);
  }

  branchId : number = Number(localStorage.getItem('branchId'));
  role: string = localStorage.getItem('role_0');

  constructor(private filterService: FilterService, private cipmService: CIPMService, private branchService: BranchService, private router:Router,private confirmationService: ConfirmationService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig, private timeService: TimeService) { }

  updateCIPMs(id: number): void{
    this.getCIPM(id);
    this.router.navigate(['updateCIPM', id]);
  }

  deleteBox(id: number):void{
    this.deleteId = id;

        this.cipmService.deleteCIPM(this.deleteId).subscribe(
          (response: void) => {
            this.getCIPMs(this.role);
          },
          (error: HttpErrorResponse) =>{
            alert(error.message)
            this.getCIPMs(this.role);
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
            this.msgs = [{severity:'success', summary:'Confirmed', detail:'Record deleted'}];
        },
        reject: () => {
            this.msgs = [{severity:'error', summary:'Rejected', detail:'Record not deleted'}];
        },
        key: "positionDialog"
    });
}

  public getCIPMs(role: string): void {
    if (role == "ROLE_IC_ADMIN") {
      this.cipmService.getCIPMs().subscribe(
        (response: CIPM[]) => {
          this.cipms = response;
          console.log("cipm = ", this.cipms)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log("BranchId = ", this.branchId);
        }
      );
    }
    else if (role == "ROLE_BRANCH_IC") {
      this.cipmService.getCIPMForBranch(this.branchId).subscribe(
        (response: CIPM[]) => {
          this.cipms = response;
          console.log("cipm = ", response, "branchId = ", this.branchId)
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
        console.log("DistrictId = ", this.districtId);
        this.cipmService.getCIPMForDistrict(this.districtId).subscribe(
        (response: CIPM[]) => {
          this.cipms = response;
          console.log("cipm = ", this.cipms)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log("BranchId = ", this.branchId);
        }
      );
      });

    }
  }

  public deleteCIPM(): void{
    this.cipmService.deleteCIPM(this.deleteId).subscribe(
      (response: void) => {
        this.getCIPMs(this.role);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        this.getCIPMs(this.role);
      }
      );
  }

  public getCIPM(id: number): CIPM[] {
    this.cipmService.getCIPM(id).subscribe(
      (response: CIPM) => {
        this.cipmR = [response];
        console.log(this.cipmR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.cipmR;
  }
}


