import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authority } from 'src/app/models/authority';
import { AuthorityC } from 'src/app/models/authorityC';
import { AuthorityService } from 'src/app/services/authority.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  bluredimage1:boolean = false;
  bluredimage2:boolean = false;
  dbStampImage: any;
  dbSignImage: any;
  postResponse: any;

  constructor(
    private authorityService: AuthorityService, 
    private router: Router, private activatedRoute: ActivatedRoute){}

  
  ngOnInit(){
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    var y: number = +x;
    if(y){
      this.getAuthImage(y);
      
    }
  
  }

  public authorityR: Authority[] = [];
  public authorityC: AuthorityC| any;

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
  
}

