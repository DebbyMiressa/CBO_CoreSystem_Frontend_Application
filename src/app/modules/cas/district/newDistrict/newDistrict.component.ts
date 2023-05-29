import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { District } from 'src/app/models/district';
import { DistrictService } from 'src/app/services/district.service';
import { DistrictP } from '../../../../models/districtP';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-newDistrict',
  templateUrl: './newDistrict.component.html',
  styleUrls: ['./newDistrict.component.scss']
})
export class NewDistrictComponent  {

  public districts: District[] = [];

  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number;

  msgs: Message[] = [];
  value: string;
  selectedDistrict: District;
  project: any = {};
  public district: District;


  constructor(private districtService: DistrictService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getDistricts();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;
    if(this.idY){
      this.getDistrict(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }


  public getDistricts(): void {
    this.districtService.getAllDistricts().subscribe(
      (response: District[]) => {
        this.districts = response;
        console.log(this.districts)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getDistrict(id: number): District {
    this.districtService.getDistrict(id).subscribe(
      (response: District) => {
        this.district = response;
        console.log(this.district)
        this.selectedDistrict = this.district;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.district;
  }

  public addDistrict(addDistrictForm: NgForm): void {
    this.districtService.addDistrict(addDistrictForm.value).subscribe(
      (response: DistrictP) => {
        console.log('works');
        console.log(response)
        alert(addDistrictForm)
        this.getDistricts();
        window.location.reload();
      },
      (error: HttpErrorResponse) =>{
        console.log('error');
        alert(error.message)
      }
      );
  }

  public updateDistrict(updateDistrict: NgForm): void {
    this.selectedDistrict = null;
    this.districtService.updateDistrict(updateDistrict.value).subscribe(
      (response: District) => {
        console.log(response);
        this.getDistricts();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }


}
