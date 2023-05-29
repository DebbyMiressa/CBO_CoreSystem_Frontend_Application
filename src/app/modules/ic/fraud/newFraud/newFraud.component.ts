import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FraudService } from '../../../../services/fraud.service';
import { CaseStatusService } from '../../../../services/caseStatus.service';
import { FraudCategoryService } from '../../../../services/fraudCategory.service';
import { FraudTypeService } from '../../../../services/fraudType.service';
import { SuspectedFraudsterProfessionService } from '../../../../services/suspectedFraudsterProfession.service';
import { BranchService } from '../../../../services/branch.service';
import { TimeService } from '../../../../services/time.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Fraud } from "../../../../models/fraud";
import { FraudP } from "../../../../models/fraudP";
import { CaseStatus } from '../../../../models/caseStatus';
import { FraudCategory } from '../../../../models/fraudCategory';
import { FraudType } from '../../../../models/fraudType';
import { SuspectedFraudsterProfession } from '../../../../models/suspectedFraudsterProfession';
import { Branch } from '../../../../models/branch';



@Component({
  selector: 'app-accordions',
  templateUrl: './newFraud.component.html',
  styleUrls: ['./newFraud.component.scss']
})

export class NewFraudComponent implements OnInit{
  public frauds: Fraud[] = [];
  public fraud: Fraud;

  public fraudR: Fraud[] = [];
  selectedFraud: Fraud;
  public caseStatuses: CaseStatus[] = [];
  selectedCaseStatus: CaseStatus;
  public fraudCategories: FraudCategory[] = [];
  selectedFraudCategory: FraudCategory;
  public fraudTypes: FraudType[] = [];
  selectedFraudType: FraudType;
  public suspectedFraudsterProfessions: SuspectedFraudsterProfession[] = [];
  selectedSuspectedFraudsterProfession: SuspectedFraudsterProfession;
  public branches: Branch[] = [];
  selectedBranch: Branch;

  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;
  msgs: Message[] = [];
  value: string;
  datePresented: string;
  branchId : number = Number(localStorage.getItem('branchId'));

  isOtherFraudCategorySelected : boolean = false;
  isOtherFraudTypeSelected : boolean = false;
  isOtherSuspectedFraudsterProfessionSelected : boolean = false;
  caseAuthorized: boolean = false;
  currentDate: Date;
  caseId: string;
  generateCaseId() : void {
    this.timeService.getDate().subscribe(
      (response: any) => {
        this.getCurrentDate();
        this.fraudService.getSize().subscribe(
          (response: any) => {
          if (response == 0) {
            this.caseId = "0001/"+ this.datePresented;
          }
          else {
            this.fraudService.getFraud(response).subscribe(
              (response: any) => {
                if(response.caseId.slice(-4) === (new Date().getFullYear().toString())){
                  this.caseId = (parseInt(response.caseId.slice(0, 4)) + 1).toString().padStart(4, "0")+"/"+this.datePresented;
                } else {
                  this.caseId = "0001/"+this.datePresented;
                }
              }
            )
          }
        }
      )
      }
    )
  }

  onFraudCategoryChange(event: any) {
    this.isOtherFraudCategorySelected = (event.value.name === 'Other');
  }
  onFraudTypeChange(event: any) {
    this.isOtherFraudTypeSelected = (event.value.name === 'Other');
  }
  onSuspectedFraudsterProfessionChange(event: any) {
    this.isOtherSuspectedFraudsterProfessionSelected = (event.value.name === 'Other');
  }

  constructor(
    private branchService: BranchService,
    private timeService: TimeService,
    private activatedRoute: ActivatedRoute,
    private fraudService: FraudService,
    private caseStatusService: CaseStatusService,
    private fraudCategoryService: FraudCategoryService,
    private fraudTypeService: FraudTypeService,
    private suspectedFraudsterProfessionService: SuspectedFraudsterProfessionService
  ) {}

  ngOnInit() {
    this.getFrauds(this.branchId);
    this.getCaseStatuses();
    this.getFraudCategories();
    this.getFraudTypes();
    this.getSuspectedFraudesterProfessions();
    this.getCurrentDate();
    this.getBranch(this.branchId);
    this.generateCaseId();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;

    if(this.idY){
      this.getFraud(this.idY);
      this.update = true;
      this.newDiv = false;
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
        this.datePresented = (this.currentDate.getMonth() + 1).toString().padStart(2, '0') + "/" + this.currentDate.getDate().toString().padStart(2, '0') + "/" + this.currentDate.getFullYear().toString();
        console.log(this.datePresented);
      }
    );
  }

  public getFrauds(branchId: number): void {
    this.fraudService.getFraudForBranch(branchId).subscribe(
      (response: Fraud[]) => {
        this.frauds = response;
        console.log(response)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getCaseStatuses(): void {
    this.caseStatusService.getCaseStatuses().subscribe(
      (response: CaseStatus[]) => {
        this.caseStatuses = response;
        console.log(this.caseStatuses)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getFraudCategories(): void {
    this.fraudCategoryService.getFraudCategories().subscribe(
      (response: FraudCategory[]) => {
        this.fraudCategories = response;
        console.log(this.fraudCategories)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getFraudTypes(): void {
    this.fraudTypeService.getFraudTypes().subscribe(
      (response: FraudType[]) => {
        this.fraudTypes = response;
        console.log(this.fraudTypes)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getSuspectedFraudesterProfessions(): void {
    this.suspectedFraudsterProfessionService.getSuspectedFraudsterProfessions().subscribe(
      (response: SuspectedFraudsterProfession[]) => {
        this.suspectedFraudsterProfessions = response;
        console.log(this.suspectedFraudsterProfessions)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getFraud(id: number): Fraud {
    this.fraudService.getFraud(id).subscribe(
      (response: Fraud) => {
        this.fraud = response;
        console.log(this.fraud)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.fraud;
  }

  public addFraud(addFraudForm: NgForm): void {
    this.fraudService.addFraud(addFraudForm.value).subscribe(
      (response: FraudP) => {
        console.log('request = ', addFraudForm.value)
        console.log('response = ', response)
        alert("Fraud Added!");
        this.getFrauds(this.branchId);
        window.location.reload();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        console.log(addFraudForm.value)
      }
      );
  }

  public updateFraud(updateFraud: NgForm): void {
    this.fraudService.updateFraud(updateFraud.value).subscribe(
      (response: Fraud) => {
        console.log(updateFraud.value);
        console.log(response);
        console.log((this.branchId));
        this.getFrauds(this.branchId);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }
}
