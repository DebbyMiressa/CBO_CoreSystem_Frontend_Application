import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { DispService } from '../MemoFile/disp.service';

import { Memo } from '../MemoFile/memo';
import { MemoService } from '../MemoFile/memo.service';
import { Templates } from '../MemoFile/Templates';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmployeeService } from '../../../services/employee.service';
import { DivisionService } from '../../../services/division.service';
import { Employee } from '../../../models/employee';
import { Positions } from '../../../models/positions';
import { Division } from '../../../models/division';
import { DivisionName } from '../../../models/divisionName';




@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']

})
export class MemoComponent extends HeaderComponent{

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public employees: Employee[] = [];
  public division: Division[] = [];
  public divisionName: DivisionName[] = [];
  ldivision:string;
  selectedEmployee: Employee;
  selectedDivision: Division;



  postMemo = {} as Memo;
  ngOnInit(){
    this.getDivision();
    this.ldivision = localStorage.getItem('division');
  }
  constructor( private templates: Templates, private employeeService: EmployeeService, private divisionService: DivisionService,private memoService:MemoService,private dispService:DispService,private router:Router,private template:Templates,private classToggler: ClassToggleService){super()};

  ckeditorContent: string;
  public Editor = ClassicEditor;
  public date: Date;
  public values = [];
  public dateTime = new Date();
  public sendTo = [
    { name: "HTML" },
    { name: "ReactJS" },
    { name: "Angular" },
    { name: "Bootstrap" },
    { name: "PrimeNG" },
  ];
value;
  //Array of all available templates
  tempArray = this.template.templateArray;
  addTemp(val: string){

    this.ckeditorContent = val;


  }
  public getEmplloyees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (errors: HttpErrorResponse) =>{
        alert(errors);
      }
      );
  }


  public getDivision(): void {
    this.divisionService.getDivisions().subscribe(
      (response: Division[]) => {
        this.division = response;
        console.log(this.division);

        //console.log(this.divisionName ,"the division nam");

      },
      (errors: HttpErrorResponse) =>{
        alert(errors);
      }
      );
  }
  addMemo(data:any){

    const now = new Date();
    data.value.sendate= now;
    data.value.toTo = data.value.toTo.name;
    data.value.fromFrom  = this.ldivision;
    data.value.carbonCopy = data.value.carbonCopy.toString();
    //data.value.carbonCopy = this.ldivision;
    //you can use for loop to concatnate strings from that array

    console.log(this.values);
    console.log(data.value.carbonCopy);
    this.memoService.addMemos(data.value).subscribe(
       (response:Memo) => {
        console.log(response);
        this.memoService.getMemos();
        this.dispService.setData(response.refnom,response.curdate,response.sendate,response.toTo,response.fromFrom,response.carbonCopy,response.subject,response.body);
        this.router.navigate(['letter']);

       },
       (error:HttpErrorResponse) => {
        alert(error.message);
       }
    );
  }
  public logout(){

  }



}
