import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

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

  public getRoles(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/role/all`, this.httpOptions)
  }
  public addRole(role: Role): Observable<any>{
    this.init();
    return this.http.post<Role>(`${this.apiServiceUrl}/role/add`, role, this.httpOptions)
  }
  public updateRole(role: Role): Observable<any>{
    this.init();
    return this.http.put<Role>(`${this.apiServiceUrl}/role/update`, role, this.httpOptions)
  }
  public deleteRole(roleId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/role/delete/${roleId}`, this.httpOptions)
  }

}
