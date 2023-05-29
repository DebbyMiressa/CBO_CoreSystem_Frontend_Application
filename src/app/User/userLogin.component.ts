import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassToggleService, FooterComponent } from '@coreui/angular';
import { HeaderComponent } from '@coreui/angular';
import { Authority } from '../models/authority';
import { AuthorityC } from '../models/authorityC';
import { AuthorityService } from '../services/authority.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-accordions',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.scss']
})
export class UserLoginComponent extends HeaderComponent{

  public authorityR: Authority[] = [];
  public authorities: Authority[] = [];
  deleteId: number = 0;
  sidebarId: string;
  bluredimage1:boolean = false;
  bluredimage2:boolean = false;
  dbStampImage: any;
  dbSignImage: any;
  postResponse: any;
  detail: boolean = false;
  displayBasic: boolean;


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

  showBasicDialog() {
    this.displayBasic = true;
}

  showDetail(id:number): void{
    this.detail =  true;
    this.showBasicDialog();
  }

  constructor(private classToggler: ClassToggleService,private authorityService: AuthorityService, private router:Router) { super();}


  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
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

  updateAuthoritys(id: number): void{
    this.getAuthority(id);

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
    this.authorityService.getActiveAuthoritys().subscribe(
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

