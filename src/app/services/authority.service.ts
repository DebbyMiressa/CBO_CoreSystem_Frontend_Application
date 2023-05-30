import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authority } from '../models/authority';
import { AuthorityC } from '../models/authorityC';

//'content-type': 'multipart/form-data; boundary=wL36Yn8afVp8Ag7AmP8qZ0SA4n1v9T'
@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

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

  public getAuthoritys(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/authority/all`, this.httpOptions)
  }
  public getActiveAuthoritys(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/authority/all/true`, this.httpOptions)
  }
  public getAuthority(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/authority/find/${id}`, this.httpOptions)
  }
  public addAuthority(authority: FormData): Observable<any>{
    this.init();
    return this.http.post(`${this.apiServiceUrl}/authority/add`, authority, this.httpOptions)
  }
  public updateAuthority(authority: Authority): Observable<any>{
    this.init();
    const formData = new FormData();
    formData.append("authId", authority.id.toString());
    formData.append("active", String(authority.active));
    return this.http.post<Authority>(`${this.apiServiceUrl}/authority/update`,formData, this.httpOptions)
  }
  public deleteAuthority(authorityId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/authority/delete/${authorityId}`, this.httpOptions)
  }

  public getAuthImage(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/authority/sid/${id}`, this.httpOptions)
  }

  public getDashboardData(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/authority/dashboard`, this.httpOptions)
  }
}
