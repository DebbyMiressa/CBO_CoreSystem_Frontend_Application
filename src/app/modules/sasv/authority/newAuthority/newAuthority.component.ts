import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authority } from 'src/app/models/authority';
import { Employee } from 'src/app/models/employee';
import { AuthorityService } from 'src/app/services/authority.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Division } from 'src/app/models/division';
import { DivisionService } from 'src/app/services/division.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-accordions',
  templateUrl: './newAuthority.component.html',
  styleUrls: ['./newAuthority.component.scss']
})
export class NewAuthorityComponent {
  
  public authorities: Authority[] = [];
  public employees: Employee[] = [];
  public authorityR: Authority[] = [];
  public divisions: Division[] = [];
  update: Boolean = false;
  newDiv: Boolean = true;
  

  constructor(private divisionService: DivisionService ,private authorityService: AuthorityService, private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(){
    this.getEmplloyees();
    this.getDivisions();
    this.getAuthorities();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    var y: number = +x;
    if(y){
      this.getAuthority(y);
      this.update = true;
      this.newDiv = false;
    }
  
  }

  public getDivisions(): void {
    this.divisionService.getDivisions().subscribe(
      (response: Division[]) => {
        this.divisions = response;
        console.log(this.divisions)
  
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  } 

  public getEmplloyees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }
 
  public addAuthority(addAuthForm: NgForm): void {
    const formData = new FormData();

    formData.append("divisionId",addAuthForm.value.divisionId)
    formData.append("employeeId",addAuthForm.value.employeeId)

      this.authorityService.addAuthority(formData).subscribe(
        (response: Authority) => {
          console.log(response);
          this.getAuthorities();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
        );
    
  
  }

  public getAuthorities(): void {
    this.authorityService.getAuthoritys().subscribe(
      (response: Authority[]) => {
        this.authorities = response;
        console.log(this.authorities)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getAuthority(id: number): void {
    this.authorityService.getAuthority(id).subscribe(
      (response: Authority) => {
        this.authorityR = [response];
        console.log(this.authorityR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

 
  
}
