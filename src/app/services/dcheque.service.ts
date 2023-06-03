import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Dcheque } from '../models/dcheque';
import { DchequeP } from '../models/dchequeP';
import { Frequency } from '../models/frequency';

@Injectable({
  providedIn: 'root'
})
export class DchequeService {

  private httpOptions;
  private apiServiceUrl;
  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    this.apiServiceUrl = localStorage.getItem('url_2');
  }

  constructor(private http: HttpClient){}

  public getDcheques(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/Dcheque/getAll`, this.httpOptions)
  }
  public getDcheque(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/Dcheque/find/${id}`, this.httpOptions)
  }
  public getDchequeForBranch(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/Dcheque/findByBranchId/${id}`, this.httpOptions)
  }
  public getDchequeForDistrict(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/Dcheque/findByDistrictId/${id}`, this.httpOptions)
  }
  public getFrequency(accountNumber: string): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/Dcheque/getFrequencyForAccountNumber/${accountNumber}`, this.httpOptions)
  }
  public addDcheque(dcheque: NgForm): Observable<any>{
    this.init();
    return this.http.post<DchequeP>(`${this.apiServiceUrl}/Dcheque/add`, dcheque , this.httpOptions)
  }
  public updateDcheque(dcheque: Dcheque): Observable<any>{
    this.init();
    return this.http.put<Dcheque>(`${this.apiServiceUrl}/Dcheque/update`, dcheque, this.httpOptions)
  }
  public deleteDcheque(dchequeId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/Dcheque/delete/${dchequeId}`, this.httpOptions)
  }
}
