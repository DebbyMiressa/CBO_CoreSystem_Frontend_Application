import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CIPMService } from '../../../services/cipm.service';
import { CollateralTypeService } from '../../../services/ct.service';
import { BranchService } from '../../../services/branch.service';
import { IPCTService } from '../../../services/ipct.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { CIPM } from "../../../models/cipm";
import { CIPMP } from "../../../models/cipmP";
import { CollateralType } from '../../../models/collatoralType';
import { Branch } from '../../../models/branch';
import { IPCT } from '../../../models/ipct';

@Component({
  selector: 'app-accordions',
  templateUrl: './newCIPM.component.html',
  styleUrls: ['./newCIPM.component.scss']
})

export class NewCIPMComponent implements OnInit{
  public cipms: CIPM[] = [];
  public cipm: CIPM;

  public cipmR: CIPM[] = [];
  selectedCIMP: CIPM;
  public collatoralTypes: CollateralType[] = [];
  selectedcollatoralType: CollateralType;
  public branches: Branch[] = [];
  selectedBranch: Branch;
  public IPCTs: IPCT[] = [];
  selectedIPCT: IPCT;

  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;
  msgs: Message[] = [];
  value: string;
  branchId : number = Number(localStorage.getItem('branchId'));
  isOtherCollateralTypeSelected : boolean = false;
  isOtherIPCTSelected : boolean = false;
  insuranceExpireDate : Date;

  constructor(private cipmService: CIPMService, private collatoralTypeService: CollateralTypeService, private branchService: BranchService, private ipctService: IPCTService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.getCIPMs(this.branchId);
    this.getCollatoralTypes();
    this.getIPCTs();
    this.branchService.getBranch(this.branchId).subscribe(
      (response: Branch) => {
        this.selectedBranch = response;
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    );
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;
    console.log(this.selectedBranch);

    if(this.idY){
      this.getCIPM(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }

  onIPCTChange(event: any) {
    this.isOtherIPCTSelected = (event.value.name === 'Other');
  }

  onCollateralTypeChange(event: any) {
    this.isOtherCollateralTypeSelected = (event.value.name === 'Other');
  }

  public getCIPMs(branchId: number): void {
    this.cipmService.getCIPMForBranch(branchId).subscribe(
      (response: CIPM[]) => {
        this.cipms = response;
        console.log(response)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getCollatoralTypes(): void {
    this.collatoralTypeService.getCollatoralTypes().subscribe(
      (response: CollateralType[]) => {
        this.collatoralTypes = response;
        console.log(this.collatoralTypes)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getIPCTs(): void {
    this.ipctService.getIPCTs().subscribe(
      (response: IPCT[]) => {
        this.IPCTs = response;
        console.log(this.IPCTs)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getCIPM(id: number): CIPM {
    this.cipmService.getCIPM(id).subscribe(
      (response: CIPM) => {
        this.cipm = response;
        console.log(this.cipm)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.cipm;
  }

  public addCIPM(addCIPMForm: NgForm): void {
    this.cipmService.addCIPM(addCIPMForm.value).subscribe(
      (response: CIPMP) => {
        console.log(response)
        alert("CIMP Added!");
        console.log(this.insuranceExpireDate);
        this.getCIPMs(this.branchId);
        window.location.reload();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        console.log(addCIPMForm.value)
      }
      );
  }

  public updateCIPM(updateCIPM: NgForm): void {
    if (updateCIPM.value.otherInsurancePolicyCoverageType == undefined) {
      updateCIPM.value.otherInsurancePolicyCoverageType = "";
    }
    this.cipmService.updateCIPM(updateCIPM.value).subscribe(
      (response: CIPM) => {
        console.log(updateCIPM.value);
        console.log(response);
        console.log((this.branchId));
        this.getCIPMs(this.branchId);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }
}
