import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { IPCT } from '../models/ipct';

@Injectable({
  providedIn: 'root'
})
export class IPCTService {
  private httpOptions;
  private apiServiceUrl;
  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token_2')}`
      })
    };
    this.apiServiceUrl = localStorage.getItem('url_2');
  }
  constructor(private http: HttpClient){}

  public getIPCTs(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/insurancePolicyCoverageType/all`, this.httpOptions)
  }
  public getIPCT(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/insurancePolicyCoverageType/find/${id}`, this.httpOptions)
  }
  public addIPCT(ipct: NgForm): Observable<any>{
    this.init();
    return this.http.post<any>(`${this.apiServiceUrl}/insurancePolicyCoverageType/add`, ipct, this.httpOptions)
  }
  public updateIPCT(ipct: IPCT): Observable<any>{
    this.init();
    console.log(ipct);
    return this.http.put<IPCT>(`${this.apiServiceUrl}/insurancePolicyCoverageType/update`, ipct, this.httpOptions)
  }
  public deleteIPCT(ctId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/insurancePolicyCoverageType/delete/${ctId}`, this.httpOptions)
  }

}
