import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee';
import { Division } from '../../../models/division';
import { HttpErrorResponse } from '@angular/common/http';
import { DivisionService } from 'src/app/services/division.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-buttons',
  templateUrl: './newEmployee.component.html',
  styleUrls: ['./newEmployee.component.scss'],
  providers: [MessageService]
})


export class NewEmployeeComponent implements OnInit{
  public divisions: Division[] = [];
  public employees: Employee[] = [];
  public employeeR: Employee[] = [];
  public employee:Employee;
  update: Boolean = false;
  newDiv: Boolean = true;
  selectedDivision: Division;
  router: Router;
  public idY:number;
  date: Date;
  uploadedFiles: any[] = [];
  maxDate: Date;
  selectedGender: string;
  genders = [
    {name: 'Male', code: 'GENDER_MALE'},
    {name: 'Female', code: 'GENDER_FEMALE'}
  ];

  constructor(private divisionService: DivisionService ,private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(){
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.getEmplloyees();
    this.getDivisions();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;
    if(this.idY){
      this.getEmployee(this.idY);
      this.update = true;
      this.newDiv = false;
    }

  }

  public addEmplloyee(addEmplForm: NgForm): void {
      this.employeeService.addEmployee(addEmplForm.value).subscribe(
        (response: Employee) => {
          console.log(response)
          this.getEmplloyees();
          window.location.reload();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
        );
}

public updateEmployee(updateEmplForm: NgForm): void {
      this.employeeService.updateEmployee(updateEmplForm.value).subscribe(
        (response: Employee) => {
          console.log(response)
          this.getEmplloyees();
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

  public getEmployee(id: number): Employee[] {
    this.employeeService.getEmployee(id).subscribe(
      (response: Employee) => {
        this.employeeR = [response];
        this.employee = response;
        console.log(this.employeeR)
        this.selectedDivision = this.employee.division;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.employeeR;
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

}
