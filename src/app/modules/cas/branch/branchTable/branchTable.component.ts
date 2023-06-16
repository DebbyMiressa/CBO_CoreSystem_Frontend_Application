import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Branch } from '../../../../models/branch';
import { BranchService } from '../../../../services/branch.service';


@Component({
  selector: 'app-accordions',
  templateUrl: './branchtable.component.html',
  styleUrls: ['./branchtable.component.scss']
})
export class BranchTableComponent {
  public branches: Branch[] = [];
  public branchR: Branch[] = [];
  selectedBranch: Branch;
  deleteId: number = 0;
  msgs: Message[] = [];
  position: string;



  constructor(private branchService: BranchService,private router:Router,private confirmationService: ConfirmationService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(){
    this.getBranches();
    this.primengConfig.ripple = true;
  }

  updateBranches(id: number): void{
    this.getBranch(id);
    this.router.navigate(['updateBranch', id]);

  }


  deleteBox(id: number):void{
    this.deleteId = id;

        this.branchService.deleteBranch(this.deleteId).subscribe(
          (response: void) => {
            this.getBranches();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message)
            this.getBranches();
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

  public deleteBranch(): void{
    this.branchService.deleteBranch(this.deleteId).subscribe(
      (response: void) => {
        this.getBranches();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        this.getBranches();
      }
      );
  }

  public getBranch(id: number): Branch[] {
    this.branchService.getBranch(id).subscribe(
      (response: Branch) => {
        this.branchR = [response];
        console.log(this.branchR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.branchR;
  }
}


