import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Division } from 'src/app/models/division';
import { DivisionService } from 'src/app/services/division.service';

@Component({
  selector: 'app-form-controls',
  templateUrl: './newDivision.component.html',
  styleUrls: ['./newDivision.component.scss'],
  providers: [MessageService]
})
export class NewDivisonComponent {

  public divisions: Division[] = [];
  public divisionR: Division[] = [];
  public division: Division;
  selectedDivision: Division;
  selectedFiles1?: File;
  currentFile1?: File;
  route?:ActivatedRoute;
  update: Boolean = false;
  newDiv: Boolean = true;
  router: Router;
  public idY:number;
  uploadedFiles: any[] = [];


  constructor(private messageService: MessageService, private divisionService: DivisionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.getDivisions();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = +x;
    if(this.idY){
      this.getDivision(this.idY);
      this.update = true;
      this.newDiv = false;
    }
  }

  public addDivision(addDivForm: NgForm): void {

    alert("in else")
    this.divisionService.addDivision(addDivForm.value).subscribe(
      (response: Division) => {
        console.log(response)
        this.getDivisions();
        window.location.reload();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public updateDiivision(updateDivForm: NgForm): void {

      alert("in else")
      this.divisionService.updateDivision(updateDivForm.value).subscribe(
        (response: Division) => {
          console.log(response)
          this.getDivisions();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
        );
  }
  public getDivision(id: number): Division[] {
    this.divisionService.getDivision(id).subscribe(
      (response: Division) => {
        this.divisionR = [response];
        this.division = response;
        console.log(this.divisionR)
        this.selectedDivision = this.division;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.divisionR;
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

}
