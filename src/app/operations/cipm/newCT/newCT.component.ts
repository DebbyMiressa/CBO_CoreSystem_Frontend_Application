import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollateralTypeService } from '../../../services/ct.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { CIPM } from "../../../models/cipm";
import { CIPMP } from "../../../models/cipmP";
import { CollateralType } from '../../../models/collatoralType';
import { Branch } from '../../../models/branch';


@Component({
  selector: 'app-accordions',
  templateUrl: './newCT.component.html',
  styleUrls: ['./newCT.component.scss']
})

export class NewCTComponent implements OnInit{
  public cts: CollateralType[] = [];
  public ct: CollateralType;

  public collatoralTypes: CollateralType[] = [];
  selectedcollatoralType: CollateralType;
  public branches: Branch[] = [];
  selectedBranch: Branch;

  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;
  msgs: Message[] = [];
  value: string;
  branchId : number = Number(localStorage.getItem('branchId'));

  constructor(private collateralTypeService: CollateralTypeService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.getCTs();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;

    if(this.idY){
      this.getCT(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }

  public getCTs(): void {
    this.collateralTypeService.getCollatoralTypes().subscribe(
      (response: CollateralType[]) => {
        this.cts = response;
        console.log(response)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getCT(id: number): CollateralType {
    this.collateralTypeService.getCollatoralType(id).subscribe(
      (response: CollateralType) => {
        this.ct = response;
        console.log(this.ct)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.ct;
  }

  public addCT(addCTForm: NgForm): void {
    this.collateralTypeService.addCollatoralType(addCTForm.value).subscribe(
      (response: CollateralType) => {
        console.log(response)
        alert("CT Added!");
        this.getCTs();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        console.log(addCTForm.value)
      }
      );
  }

  public updateCT(updateCT: NgForm): void {
    this.collateralTypeService.updateCollatoralType(updateCT.value).subscribe(
      (response: CollateralType) => {
        console.log(updateCT.value);
        console.log(response);
        console.log((this.branchId));
        this.getCTs();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }
}
