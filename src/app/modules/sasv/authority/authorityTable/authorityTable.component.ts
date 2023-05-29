import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Authority } from 'src/app/models/authority';
import { AuthorityC } from 'src/app/models/authorityC';
import { AuthorityService } from '../../../../services/authority.service';


@Component({
  selector: 'app-accordions',
  templateUrl: './authorityTable.component.html',
  styleUrls: ['./authorityTable.component.scss']
})
export class AuthorityTableComponent {

  public authorityR: Authority[] = [];
  public authorities: Authority[] = [];
  selectedCustomer1: Authority;
  bluredimage1:boolean = false;
  bluredimage2:boolean = false;
  dbStampImage: any;
  dbSignImage: any;
  postResponse: any;
  detail: boolean = false;
  deleteId: number = 0;
  displayBasic: boolean;
  displayModal: boolean;

  constructor(private authorityService: AuthorityService,private router:Router) { }

  ngOnInit(){
    this.getAuthorities();
  }

  showBasicDialog() {
    this.displayBasic = true;
}

  showBlurred1(): void{
    this.bluredimage1 = !this.bluredimage1;
  }

  deleteBlurred1(): void{
    this.bluredimage1 = !this.bluredimage1;
  }

  showBlurred2(): void{
    this.bluredimage2 = !this.bluredimage2;
  }

  deleteBlurred2(): void{
    this.bluredimage2 = !this.bluredimage2;
  }

  updateAuthoritys(id: number): void{
    this.getAuthority(id);
  }

  showDetail(id: number): void{
    this.detail =  true;
    this.getAuthority(id);
    this.getAuthImage(id);
  }


  public getAuthImage(id: number){
    this.authorityService.getAuthImage(id).subscribe(
      (response: AuthorityC) => {
        this.postResponse = response;
        console.log(response.employee.id);
        console.log(this.postResponse);
        this.dbStampImage = 'data:image/jpeg;base64,' + this.postResponse.stamp;
        this.dbSignImage = 'data:image/jpeg;base64,' + this.postResponse.signature;

      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public getAuthority(id: number): void {
    this.authorityService.getAuthority(id).subscribe(
      (response: Authority) => {
        this.authorityR = [response];
        console.log(this.authorityR)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public updatedAuthority(updateAuthForm: NgForm): void {

    this.authorityService.updateAuthority(updateAuthForm.value).subscribe(
        (response: Authority) => {
          console.log(response);
          this.getAuthorities();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
        );
  }

  public getAuthorities(): void {
    this.authorityService.getAuthoritys().subscribe(
      (response: Authority[]) => {
        this.authorities = response;
        console.log(this.authorities)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }
}

