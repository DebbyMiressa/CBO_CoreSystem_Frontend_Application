import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../../models/employee';
import { EmployeeService } from '../../../../services/employee.service';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-accordions',
  templateUrl: './EmployeeTable.component.html',
  styleUrls: ['./EmployeeTable.component.scss']
})
export class EmployeeTableComponent {

  public employees: Employee[] = [];
  public employeeR: Employee[] = [];
  selectedCustomer1: Employee;
  deleteId: number = 0;
  position: string;
  msgs: Message[] = [];

  constructor(private employeeService: EmployeeService,private router:Router,private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }


  ngOnInit(){
    this.getEmplloyees();
    this.primengConfig.ripple = true;
  }

  updateEmployees(id: number): void{
    this.getEmployee(id);
    this.router.navigate(['updateEmployee', id]);

  }

  deleteBox(id: number):void{
    this.deleteId = id;
    this.employeeService.deleteEmployee(this.deleteId).subscribe(
      (response: void) => {
        this.getEmplloyees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        this.getEmplloyees();
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



  public deleteEmployee(): void{
    this.employeeService.deleteEmployee(this.deleteId).subscribe(
      (response: void) => {
        this.getEmplloyees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        this.getEmplloyees();
      }
      );
  }


  public getEmployee(id: number): Employee[] {
    this.employeeService.getEmployee(id).subscribe(
      (response: Employee) => {
        this.employeeR = [response];
        console.log(this.employeeR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.employeeR;
  }

}
