import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Division } from '../models/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private httpOptions;
  private apiServiceUrl;
  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token_1')}`
      })
    };
    this.apiServiceUrl = localStorage.getItem('url_1');
  }

  constructor(private http: HttpClient){}

  public getDivisions(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/division/all`, this.httpOptions)
  }
  public getDivision(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/division/find/${id}`, this.httpOptions)
  }
  public addDivision(division: FormData): Observable<any>{
    this.init();
    return this.http.post(`${this.apiServiceUrl}/division/add`, division, this.httpOptions)
  }
  public updateDivision(division: FormData): Observable<any>{
    this.init();
    return this.http.put(`${this.apiServiceUrl}/division/update`, division, this.httpOptions)
  }
  public deleteDivision(divisionId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/division/delete/${divisionId}`, this.httpOptions)
  }
}
