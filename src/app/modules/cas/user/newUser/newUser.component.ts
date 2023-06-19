import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../../models/user';
import { UserP } from '../../../../models/userP';
import { Role } from "../../../../models/role";
import { Branch } from "../../../../models/branch";
import { UserService } from '../../../../services/user.service';
import { Employee } from '../../../../models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ModuleService } from 'src/app/services/module.service';
import { BranchService } from 'src/app/services/branch.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Module } from 'src/app/models/module';
import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-accordions',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})

export class NewUserComponent implements OnInit{
  public users: User[] = [];
  public user: User;
  public roles: Role[] = [];
  public rolesStr: String[] = [];
  public modules: Module [] = [];
  public employeeR: Employee[] = [];
  public employees: Employee[] = [];
  public branches: Branch[] = [];
  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;
  msgs: Message[] = [];
  value: string;
  selectedModules: Module[];
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

  constructor(private userService: UserService, private employeeService: EmployeeService, private moduleService: ModuleService,  private branchService: BranchService, private activatedRoute: ActivatedRoute, private roleService: RoleService) {}

  ngOnInit(){
    this.populateRoles();
    this.getEmplloyees();
    this.getUsers();
    this.getModules();
    this.getBranches();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;

    if(this.idY){
      this.getUser(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }

  populateRoles(): void {
    let index = 0;
    let cond = localStorage.getItem('role_' + index);
    while (cond) {
      console.log("role_" + index + " = " + cond)
      this.rolesStr.push(cond);
      index++;
      cond = localStorage.getItem('role_' + index);
    }
  }

  public changeStatus() {
    this.isClicked = !this.isClicked;
  }

  public getModules(): void {
    this.moduleService.getModules().subscribe(
      (response: Module[]) => {
        this.modules = response;
        console.log(this.modules)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  checkRole(roleName: string): boolean {
    let result: boolean = false; // declare a variable to store the result
    this.rolesStr.forEach(role => {
      if (role.indexOf(roleName) !== -1) {
        result = true; // assign true to the result if the role matches
      }
    });
    return result; // return the result at the end of the function
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
      this.selectedModules = this.user.modules;
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
     this.selectedModules = null;
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
