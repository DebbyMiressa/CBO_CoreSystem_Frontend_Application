import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DchequeService } from '../../../../services/dcheque.service';
import { ChequeTypeService } from '../../../../services/chequeType.service';
import { ActionTakenService } from '../../../../services/actionTaken.service';
import { BranchService } from '../../../../services/branch.service';
import { TimeService } from '../../../../services/time.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Dcheque } from "../../../../models/dcheque";
import { DchequeP } from "../../../../models/dchequeP";
import { ChequeType } from '../../../../models/chequeType';
import { Branch } from '../../../../models/branch';
import { ActionTaken } from 'src/app/models/actionTaken';


@Component({
  selector: 'app-accordions',
  templateUrl: './newDcheque.component.html',
  styleUrls: ['./newDcheque.component.scss']
})

export class NewDchequeComponent implements OnInit {
  public dcheques: Dcheque[] = [];
  public dcheque: Dcheque;

  public dchequeR: Dcheque[] = [];
  selectedDcheque: Dcheque;
  public chequeTypes: ChequeType[] = [];
  selectedChequeType: ChequeType;
  public branches: Branch[] = [];
  selectedBranch: Branch;
  public actionsTaken: ActionTaken[] = [];
  selectedActionTaken: ActionTaken;

  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;
  msgs: Message[] = [];
  value: string;
  branchId: number = Number(localStorage.getItem('branchId'));

  chequeNumber: string;
  currentDate: Date;
  datePresented: string;
  frequency: number = 0;
  accountNumber: string;
  constructor(private dchequeService: DchequeService, private branchService: BranchService, private timeService: TimeService, private activatedRoute: ActivatedRoute, private actionTakenService: ActionTakenService, private chequeTypeService: ChequeTypeService) { }

  ngOnInit() {
    this.getDcheques(this.branchId);
    this.getChequeTypes();
    this.getActionsTaken();
    this.getCurrentDate();
    this.getBranch(this.branchId);
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;

    if (this.idY) {
      this.getDcheque(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }

  searchFrequency(accountNumber: string): void {
    if (accountNumber.length === 13) {
      // call the service to get the frequency
      this.dchequeService.getFrequency(accountNumber).subscribe(
        // handle the success response
        (response: any) => {
          // store the frequency in the component property
          this.frequency = response.count;
          // do something else with the frequency if needed
        },
        // handle the error response
        error => {
          // display an error message or handle it in some other way
          console.error(error);
        }
      );
    }
    else {
      this.frequency = 0;
    }
  }

  getBranch(branchId: number): void {
    this.branchService.getBranch(this.branchId).subscribe(
      (response: any) => {
        this.selectedBranch = response;
      }
    );
  }


  getCurrentDate(): void {
    this.timeService.getDate().subscribe(
      (response: any) => {
        this.currentDate = new Date(response.time);
        console.log(this.currentDate);
        this.datePresented = (this.currentDate.getMonth() + 1).toString() + "/" + this.currentDate.getDate().toString() + "/" + this.currentDate.getFullYear().toString();
        console.log(this.datePresented);
      }
    );
  }

  public getDcheques(branchId: number): void {
    this.dchequeService.getDchequeForBranch(branchId).subscribe(
      (response: Dcheque[]) => {
        this.dcheques = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getChequeTypes(): void {
    this.chequeTypeService.getChequeTypes().subscribe(
      (response: ChequeType[]) => {
        this.chequeTypes = response;
        console.log(this.chequeTypes)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public getActionsTaken(): void {
    this.actionTakenService.getActionsTaken().subscribe(
      (response: ActionTaken[]) => {
        this.actionsTaken = response;
        console.log(this.actionsTaken)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public getDcheque(id: number): Dcheque {
    this.dchequeService.getDcheque(id).subscribe(
      (response: Dcheque) => {
        this.dcheque = response;
        console.log(this.dcheque)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    return this.dcheque;
  }

  public addDcheque(addDchequeForm: NgForm): void {
    this.dchequeService.addDcheque(addDchequeForm.value).subscribe(
      (response: DchequeP) => {
        console.log('request = ', addDchequeForm.value)
        console.log('response = ', response)
        alert("Dcheque Added!");
        this.getDcheques(this.branchId);
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        console.log(addDchequeForm.value)
      }
    );
  }

  public updateDcheque(updateDcheque: NgForm): void {
    if (updateDcheque.value.otherInsurancePolicyCoverageType == undefined) {
      updateDcheque.value.otherInsurancePolicyCoverageType = "";
    }
    this.dchequeService.updateDcheque(updateDcheque.value).subscribe(
      (response: Dcheque) => {
        console.log(updateDcheque.value);
        console.log(response);
        console.log((this.branchId));
        this.getDcheques(this.branchId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}
