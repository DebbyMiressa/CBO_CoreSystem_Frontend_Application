import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CollateralType } from '../models/collatoralType';
import { ActionTaken } from '../models/actionTaken';
import { ChequeType } from '../models/chequeType';

@Injectable({
  providedIn: 'root'
})
export class ChequeTypeService {

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

  public getChequeTypes(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/chequeType/all`, this.httpOptions)
  }
  public getAChequeType(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/chequeType/find/${id}`, this.httpOptions)
  }
  public addChequeType(ct: NgForm): Observable<any>{
    this.init();
    return this.http.post<any>(`${this.apiServiceUrl}/chequeType/add`, ct, this.httpOptions)
  }
  public updateChequeType(ct: ChequeType): Observable<any>{
    this.init();
    console.log(ct);
    return this.http.put<ChequeType>(`${this.apiServiceUrl}/chequeType/update`,ct , this.httpOptions)
  }
  public deleteChequeType(ctId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/chequeType/delete/${ctId}`, this.httpOptions)
  }

}
