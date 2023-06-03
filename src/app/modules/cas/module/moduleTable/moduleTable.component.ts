import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Module } from '../../../../models/module';
import { ModuleService } from '../../../../services/module.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-select',
  templateUrl: './moduleTable.component.html',
  styleUrls: ['./moduleTable.component.scss']
})
export class ModuleTableComponent {

  public moduleR: Module[] = [];
  public modules: Module[] = [];
  selectedCustomer1: Module;
  deleteId: number = 0;
  position: string;
  msgs: Message[] = [];

  constructor(private moduleService: ModuleService,private router:Router,private confirmationService: ConfirmationService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(){
    this.getModules();
    this.primengConfig.ripple = true;
  }
  updateModules(id: number): void{
    this.getModule(id);
    this.router.navigate(['updateModule',id]);
  }

  deleteBox(id: number):void{
    this.deleteId = id;
    this.moduleService.deleteModule(this.deleteId).subscribe(
      (response: void) => {
        this.getModules();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        this.getModules();
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



  public deleteModule(): void{
    this.moduleService.deleteModule(this.deleteId).subscribe(
      (response: void) => {
        this.getModules();
      },
      (error: HttpErrorResponse) =>{
        this.getModules();
      }
      );
  }



  public getModule(id: number): Module[] {
    this.moduleService.getModule(id).subscribe(
      (response: Module) => {
        this.moduleR = [response];
        console.log(this.moduleR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.moduleR;
  }

}
