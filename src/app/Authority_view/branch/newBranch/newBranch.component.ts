import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Branch } from 'src/app/models/branch';
import { DistrictService } from "src/app/services/district.service";
import { BranchService } from 'src/app/services/branch.service';
import { Message } from 'primeng/api';
import { District } from "../../../models/district";
import { BranchP } from '../../../models/branchP';

@Component({
  selector: 'app-accordions',
  templateUrl: './newBranch.component.html',
  styleUrls: ['./newBranch.component.scss']
})
export class NewBranchComponent {

  public branches: Branch[] = [];
  public branch: Branch;

  public districts: District[] = [];
  public districtR: District[] = [];

  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;

  msgs: Message[] = [];
  value: string;
  selectedDistrict: District;
  project: any = {};

  constructor(private branchService: BranchService, private districtService: DistrictService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.getDistricts();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;

    if(this.idY){
      this.getBranch(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }

  public getDistricts(): void {
    this.districtService.getAllDistricts().subscribe(
      (response: District[]) => {
        this.districts = response;
        console.log(this.districts)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getDistrict(id: number): District[] {
    this.districtService.getDistrict(id).subscribe(
      (response: District) => {
        this.districtR = [response];
        console.log(this.districtR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.districtR;
  }

  public addBranch(addBranchForm: NgForm): void {
    this.branchService.addBranch(addBranchForm.value).subscribe(
      (response: BranchP) => {
        console.log('works');
        console.log(response)
        alert(addBranchForm)
        this.getBranches();
        window.location.reload();
      },
      (error: HttpErrorResponse) =>{
        console.log('error');
        alert(error.message)
      }
      );
  }

  public getBranches(): void {
    this.branchService.getBranches().subscribe(
      (response: Branch[]) => {
        this.branches = response;
        console.log(this.branches)

      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getBranch(id: number): Branch {
    this.branchService.getBranch(id).subscribe(
      (response: Branch) => {
        this.branch = response;
        console.log(this.branch)
        this.selectedDistrict = this.branch.district;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.branch;
  }

  public updateBranch(updateBranch: NgForm): void {
    this.selectedDistrict = null;
    this.branchService.updateBranch(updateBranch.value).subscribe(
      (response: Branch) => {
        console.log(response);
        this.getBranches();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

}
