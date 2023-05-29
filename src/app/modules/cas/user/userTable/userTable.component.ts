import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-accordions',
  templateUrl: './UserTable.component.html',
  styleUrls: ['./UserTable.component.scss']
})
export class UserTableComponent {
  public users: User[] = [];
  public userR: User[] = [];
  selectedCustomer1: User;
  deleteId: number = 0;
  msgs: Message[] = [];
  position: string;



  constructor(private userService: UserService,private router:Router,private confirmationService: ConfirmationService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(){
    this.getUsers();
    this.primengConfig.ripple = true;
  }

  updateUsers(id: number): void{
    this.getUser(id);
    this.router.navigate(['updateUser', id]);
  }


  deleteBox(id: number):void{
    this.deleteId = id;

        this.userService.deleteUser(this.deleteId).subscribe(
          (response: void) => {
            this.getUsers();
          },
          (error: HttpErrorResponse) =>{
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
            this.msgs = [{severity:'success', summary:'Confirmed', detail:'Record deleted'}];
        },
        reject: () => {
            this.msgs = [{severity:'error', summary:'Rejected', detail:'Record not deleted'}];
        },
        key: "positionDialog"
    });
}

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        if (localStorage.getItem('role_0') === 'ROLE_SUPER_ADMIN') {
          this.users = response;
        }
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < response[i].roles.length; j++) {
            if (localStorage.getItem('role_0') === 'ROLE_IC_ADMIN') {
              const roleName = response[i].roles[j].name;
              if (roleName === 'ROLE_IC_ADMIN' || roleName === 'ROLE_BRANCH_IC' || roleName === 'ROLE_DISTRICT_IC' || roleName === 'ROLE_BRANCH_MANAGER') {
                this.users.push(response[i]);
              }
            }
          }
        }
        this.users = response;
        console.log(this.users)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public deleteUser(): void{
    this.userService.deleteUser(this.deleteId).subscribe(
      (response: void) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) =>{
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
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.userR;
  }
}


