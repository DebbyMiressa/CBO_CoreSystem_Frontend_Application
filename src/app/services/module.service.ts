import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/module';
import { NgForm } from '@angular/forms';
import { ModuleP } from '../models/moduleP';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private http: HttpClient){}
  private httpOptions;
  private apiServiceUrl;
  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token_1')}`
      })
    };
   this.apiServiceUrl = localStorage.getItem("url_1");
  }

  public getModules(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/module/getAll`, this.httpOptions)
  }
  public getModule(id: number):Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/module/find/${id}`, this.httpOptions)
  }
  public getModuleIdByName(name: string): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/module/findId/${name}`, this.httpOptions)
  }
  public getUrlByName(name: string): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/module/findUrl/${name}`, this.httpOptions)
  }
  public addModule(module: NgForm): Observable<any>{
    this.init();
    return this.http.post<ModuleP>(`${this.apiServiceUrl}/module/add`, module , this.httpOptions)
  }
  public updateModule(module: Module): Observable<any>{
    this.init();
    return this.http.put<Module>(`${this.apiServiceUrl}/module/update`, module, this.httpOptions)
  }
  public deleteModule(moduleId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/module/delete/${moduleId}`, this.httpOptions)
  }

}
