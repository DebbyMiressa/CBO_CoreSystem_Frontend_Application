import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Division } from '../models/division';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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

  public getEmployees(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/employee/all`, this.httpOptions)
  }
  public getEmployee(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/employee/find/${id}`, this.httpOptions)
  }
  public getPositions(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/employee/positions`, this.httpOptions)
  }
  public addEmployee(employee: FormData): Observable<any>{
    this.init();
    return this.http.post<any>(`${this.apiServiceUrl}/employee/add`, employee, this.httpOptions)
  }
  public updateEmployee(employee: FormData): Observable<any>{
    this.init();
    return this.http.put(`${this.apiServiceUrl}/employee/update`,employee, this.httpOptions)
  }
  public deleteEmployee(employeeId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/employee/delete/${employeeId}`, this.httpOptions)
  }
}
