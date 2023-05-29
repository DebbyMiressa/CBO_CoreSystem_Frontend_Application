import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { District } from 'src/app/models/district';
import { DistrictService } from 'src/app/services/district.service';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-districtTable',
  templateUrl: './districtTable.component.html',
  styleUrls: ['./districtTable.component.scss']
})
export class DistrictTableComponent {
  public districts: District[] = [];
  public districtR: District[] = [];
  selectedDistrict: District;
  deleteId: number = 0;
  msgs: Message[] = [];
  position: string;



  constructor(private districtService: DistrictService,private router:Router,private confirmationService: ConfirmationService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(){
    this.getDistricts();
    this.primengConfig.ripple = true;
  }

  updateDistricts(id: number): void{
    this.getDistrict(id);
    this.router.navigate(['updateDistrict', id]);

  }


  deleteBox(id: number):void{
    this.deleteId = id;

        this.districtService.deleteDistrict(this.deleteId).subscribe(
          (response: void) => {
            this.getDistricts();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message)
            this.getDistricts();
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

  public getDistricts(): void {
    this.districtService.getAllDistricts().subscribe(
      (response:District[]) => {
        this.districts = response;
        console.log(this.districts)

      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public deleteDistrict(): void{
    this.districtService.deleteDistrict(this.deleteId).subscribe(
      (response: void) => {
        this.getDistricts();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        this.getDistricts();
      }
      );
  }

  public getDistrict(id: number): District[] {
    this.districtService.getDistrict(id).subscribe(
      (response: District) => {
        this.districtR = [response];
        console.log(this.districtR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.districtR;
  }
}
