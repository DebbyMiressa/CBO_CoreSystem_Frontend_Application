import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Module } from '../../../../models/module';
import { ModuleService } from '../../../../services/module.service';

@Component({
  selector: 'app-form-controls',
  templateUrl: './newModule.component.html',
  styleUrls: ['./newModule.component.scss'],
  providers: [MessageService]
})
export class NewModuleComponent {

  public modules: Module[] = [];
  public moduleR: Module[] = [];
  public module: Module;
  selectedModule: Module;
  selectedFiles1?: File;
  currentFile1?: File;
  route?:ActivatedRoute;
  update: Boolean = false;
  newMod: Boolean = true;
  router: Router;
  public idY:number;
  uploadedFiles: any[] = [];


  constructor(private messageService: MessageService, private moduleService: ModuleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.getModules();
    var x = this.activatedRoute.snapshot.paramMap.get("id");
    this.idY = + x;
    if(this.idY){
      this.getModule(this.idY);
      this.update = true;
      this.newMod = false;
    }
  }

  public addModule(addDivForm: NgForm): void {

    alert("in else")
    this.moduleService.addModule(addDivForm.value).subscribe(
      (response: Module) => {
        console.log(response)
        this.getModules();
        window.location.reload();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
  }

  public updateDiivision(updateDivForm: NgForm): void {

      alert("in else")
      this.moduleService.updateModule(updateDivForm.value).subscribe(
        (response: Module) => {
          console.log(response)
          this.getModules();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
        );
  }
  public getModule(id: number): Module[] {
    this.moduleService.getModule(id).subscribe(
      (response: Module) => {
        this.moduleR = [response];
        this.module = response;
        console.log(this.moduleR)
        this.selectedModule = this.module;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
      );
      return this.moduleR;
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

}
