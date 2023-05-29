import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../models/user';
import { UserP } from '../../../models/userP';
import { Role } from "../../../models/role";
import { Branch } from "../../../models/branch";
import { UserService } from '../../../services/user.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { RoleService } from 'src/app/services/role.service';
import { BranchService } from 'src/app/services/branch.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-accordions',
  templateUrl: './newUser.component.html',
  styleUrls: ['./newUser.component.scss']
})

export class NewUserComponent implements OnInit{
  public users: User[] = [];
  public user: User;
  public roles: Role [] = [];
  public employeeR: Employee[] = [];
  public employees: Employee[] = [];
  public branches: Branch[] = [];
  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;
  msgs: Message[] = [];
  value: string;
  selectedRole: Role;
  selectedBranch: Branch;
  selectedEmployee: Employee;
  selectedState: boolean;
  project: any = {};
  isClicked: boolean = false;
  states: any[] = [
    {name: 'Active', value: true},
    {name: "Inactive", value: false}
  ];
  active: boolean;

  constructor(private userService: UserService, private employeeService: EmployeeService, private roleService: RoleService,  private branchService: BranchService, private activatedRoute: ActivatedRoute, private role: RoleService) {}

  ngOnInit(){
    this.getEmplloyees();
    this.getUsers();
    this.getRoles();
    this.getBranches();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;

    if(this.idY){
      this.getUser(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }

  public changeStatus() {
    this.isClicked = !this.isClicked;
  }

  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
        console.log(this.roles)
      },
      (error: HttpErrorResponse) =>{
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
        console.log(this.employeeR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.employeeR;
  }

  public addUser(addUserForm: NgForm): void {
    this.userService.addUser(addUserForm).subscribe(
      (response: UserP) => {
        console.log(response)
        alert(addUserForm)
        this.getUsers();
        window.location.reload();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        console.log(addUserForm.value)
      }
      );
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users)

      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getUser(id: number): User {
    this.userService.getUser(id).subscribe(
      (response: User) => {
        this.user = response;
        console.log(this.user)
      this.selectedRole = this.user.roles[0];
      this.selectedEmployee = this.user.employee;
      this.selectedState = this.user.active;

      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.user;
  }

  public updateUser(updateUser: NgForm): void {
     this.selectedRole = null;
     this.selectedEmployee = null;
     this.selectedState = null;
    this.userService.updateUser(updateUser.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }
}
