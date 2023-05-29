import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Division } from '../../../../models/division';
import { DivisionService } from '../../../../services/division.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-select',
  templateUrl: './divisionTable.component.html',
  styleUrls: ['./divisionTable.component.scss']
})
export class DivisionTableComponent {

  public divisionR: Division[] = [];
  public divisions: Division[] = [];
  selectedCustomer1: Division;
  deleteId: number = 0;
  position: string;
  msgs: Message[] = [];

  constructor(private divisionService: DivisionService,private router:Router,private confirmationService: ConfirmationService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(){
    this.getDivisions();
    this.primengConfig.ripple = true;
  }
  updateDivisions(id: number): void{
    this.getDivision(id);
    this.router.navigate(['updateDivision',id]);
  }

  deleteBox(id: number):void{
    this.deleteId = id;
    this.divisionService.deleteDivision(this.deleteId).subscribe(
      (response: void) => {
        this.getDivisions();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        this.getDivisions();
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



  public deleteDivision(): void{
    this.divisionService.deleteDivision(this.deleteId).subscribe(
      (response: void) => {
        this.getDivisions();
      },
      (error: HttpErrorResponse) =>{
        this.getDivisions();
      }
      );
  }



  public getDivision(id: number): Division[] {
    this.divisionService.getDivision(id).subscribe(
      (response: Division) => {
        this.divisionR = [response];
        console.log(this.divisionR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.divisionR;
  }

}
