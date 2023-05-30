import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../models/employee';
import { Division } from '../../../../models/division';
import { HttpErrorResponse } from '@angular/common/http';
import { DivisionService } from 'src/app/services/division.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-buttons',
  templateUrl: './newEmployee.component.html',
  styleUrls: ['./newEmployee.component.scss'],
  providers: [MessageService, DatePipe]
})


export class NewEmployeeComponent implements OnInit {
  public divisions: Division[] = [];
  public employees: Employee[] = [];
  public employeeR: Employee[] = [];
  public employee: Employee;
  selectedFiles2?: File;
  update: Boolean = false;
  newDiv: Boolean = true;
  selectedDivision: Division;
  public idY: number;
  gender: string;
  maxDate: Date;

  uploadedFiles: any[] = [];
  myDate = new Date();


  constructor(private datePipe: DatePipe, private router: Router, private divisionService: DivisionService, private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private messageService: MessageService) {

    //this.maxDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  ngOnInit() {
    this.getEmplloyees();
    this.getDivisions();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;
    if (this.idY) {
      this.getEmployee(this.idY);
      this.update = true;
      this.newDiv = false;
    }

    this.maxDate = this.myDate;
  }

  onSelect(event) {
    this.selectedFiles2 = event.files[0];
    for (let file of event.files) {
      this.selectedFiles2 = file
    }
  }

  public addEmplloyee(addEmplForm: NgForm): void {
    const formData = new FormData();

    formData.append("givenName", addEmplForm.value.givenName)
    formData.append("fatherName", addEmplForm.value.fatherName)
    formData.append("grandFatherName", addEmplForm.value.grandFatherName)
    formData.append("position", addEmplForm.value.position)
    formData.append("email", addEmplForm.value.email)
    formData.append("phoneNumber", addEmplForm.value.phoneNumber)
    formData.append("divisionId", addEmplForm.value.divisionId.id)
    formData.append("cboEmail", addEmplForm.value.cboEmail)
    formData.append("birthDate", addEmplForm.value.birthDate)
    formData.append("gender", addEmplForm.value.gender)

    if (this.selectedFiles2) {
      formData.append('signatureImage', this.selectedFiles2);
      this.employeeService.addEmployee(formData).subscribe(
        (response: Employee) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee is created.' });
          setTimeout(() => { this.router.navigate(['employee']); }, 1000);
          this.getEmplloyees();
        },
        (errors: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errors.error.message });
        }
      );

      this.selectedFiles2 = undefined;
    }
    else {
      formData.append('signatureImage', null);

      this.employeeService.addEmployee(formData).subscribe(
        (response: Employee) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee is updated.' });
          setTimeout(() => { this.router.navigate(['employee']); }, 1000);
          this.getEmplloyees();
        },
        (errors: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errors.error.message });
        }
      );
    }
  }

  public updateEmployee(updateEmployee: NgForm): void {

    const formData = new FormData();

    formData.append("givenName", updateEmployee.value.givenName)
    formData.append("fatherName", updateEmployee.value.fatherName)
    formData.append("grandFatherName", updateEmployee.value.grandFatherName)
    formData.append("position", updateEmployee.value.position)
    formData.append("email", updateEmployee.value.email)
    formData.append("phoneNumber", updateEmployee.value.phoneNumber)
    formData.append("divisionId", updateEmployee.value.divisionId.id)
    formData.append("id", updateEmployee.value.id)
    formData.append("cboEmail", updateEmployee.value.cboEmail)
    formData.append("birthDate", updateEmployee.value.birthDate)
    formData.append("gender", updateEmployee.value.gender)

    if (this.selectedFiles2) {
      formData.append('signatureImage', this.selectedFiles2);
      this.employeeService.updateEmployee(formData).subscribe(
        (response: Employee) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee is updated.' });
          setTimeout(() => { this.router.navigate(['employee']); }, 1000);
          this.getEmplloyees();
        },
        (errors: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errors.error.message });
        }
      );
      this.selectedFiles2 = undefined;
    }
    else {
      formData.append('signatureImage', null);

      this.employeeService.updateEmployee(formData).subscribe(
        (response: Employee) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee is updated.' });
          setTimeout(() => { this.router.navigate(['employee']); }, 1000);
          this.getEmplloyees();
        },
        (errors: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errors.error.message });
        }
      );
    }
  }

  public getEmplloyees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (errors: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errors.error.message });
      }
    );
  }

  public getEmployee(id: number): Employee[] {
    this.employeeService.getEmployee(id).subscribe(
      (response: Employee) => {
        this.employeeR = [response];
        this.employee = response;
        this.selectedDivision = this.employee.division;
      },
      (errors: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errors.error.message });
      }
    );
    return this.employeeR;
  }

  public getDivisions(): void {
    this.divisionService.getDivisions().subscribe(
      (response: Division[]) => {
        this.divisions = response;
      },
      (errors: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errors.error.message });
      }
    );
  }

}
