import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-accordions',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})
export class UserTableComponent {
  public users: User[] = [];
  public filteredUsers: User[] = [];
  public userR: User[] = [];
  selectedCustomer1: User;
  deleteId: number = 0;
  msgs: Message[] = [];
  position: string;
  roles: string[] = [];

  constructor(private userService: UserService, private router: Router, private confirmationService: ConfirmationService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.populateRoles();
    this.getUsers();
    this.primengConfig.ripple = true;
  }
  populateRoles(): void {
    let index = 0;
    let cond = localStorage.getItem('role_' + index);
    while (cond) {
      console.log("role_" + index + " = " + cond)
      this.roles.push(cond);
      index++;
      cond = localStorage.getItem('role_' + index);
    }
  }

  assignUser(id: number): void {
    this.getFilteredUsers(this.users);
    this.router.navigate(['assignUser', id]);
  }

  updateUsers(id: number): void {
    this.getUser(id);
    this.router.navigate(['updateUser', id]);
  }

  index = 0;
  callIndex(check: boolean) {
    if (check) {
      this.index++;
    }
    return this.index;
  }

  getFilteredUsers(users: User[]): void {
    users.some((user) => user.roles.some((role) => {
      if (this.checkRole("ROLE_SUPER_ADMIN") ||
        (this.checkRole("ROLE_IC_ADMIN") && ((role.name.indexOf('ROLE_BRANCH_IC') !== -1 || role.name.indexOf('ROLE_BRANCH_MANAGER') !== -1 || role.name.indexOf('ROLE_DISTRICT_IC') !== -1 || role.name.indexOf('ROLE_IC_ADMIN') !== -1))) ||
        (this.checkRole("ROLE_SASV_ADMIN") && (role.name.indexOf('ROLE_SASV_ADMIN') !== -1 || role.name.indexOf('ROLE_SASV_VIEW') !== -1)) ||
        (this.checkRole("ROLE_SANCTION_ADMIN") && (role.name.indexOf('ROLE_SANCTION_ADMIN') !== -1 || role.name.indexOf('ROLE_SANCTION_VIEW') !== -1))) {
        if (this.filteredUsers.indexOf(user) === -1) {
          this.filteredUsers.push(user);
        }
      }
    }));
  }

  checkRole(roleName: string): boolean {
    let result: boolean = false; // declare a variable to store the result
    this.roles.forEach(role => {
      if (role.indexOf(roleName) !== -1) {
        result = true; // assign true to the result if the role matches
      }
    });
    return result; // return the result at the end of the function
  }

  deleteBox(id: number): void {
    this.deleteId = id;

    this.userService.deleteUser(this.deleteId).subscribe(
      (response: void) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        this.getUsers();
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
        this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'Record deleted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'error', summary: 'Rejected', detail: 'Record not deleted' }];
      },
      key: "positionDialog"
    });
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        if (this.checkRole("ROLE_SUPER_ADMIN")) {
          this.users = response;
        }
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < response[i].roles.length; j++) {
            if (this.checkRole("ROLE_IC_ADMIN")) {
              const roleName = response[i].roles[j].name;
              if (roleName === 'ROLE_IC_ADMIN' || roleName === 'ROLE_BRANCH_IC' || roleName === 'ROLE_DISTRICT_IC' || roleName === 'ROLE_BRANCH_MANAGER') {
                this.users.push(response[i]);
              }
            }
          }
        }
        this.users = response;
        console.log(this.users)
        this.getFilteredUsers(this.users);
        console.log(this.filteredUsers)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public deleteUser(): void {
    this.userService.deleteUser(this.deleteId).subscribe(
      (response: void) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        this.getUsers();
      }
    );
  }

  public getUser(id: number): User[] {
    this.userService.getUser(id).subscribe(
      (response: User) => {
        this.userR = [response];
        console.log(this.userR)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    return this.userR;
  }
}


