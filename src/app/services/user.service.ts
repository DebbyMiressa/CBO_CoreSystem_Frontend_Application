import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserP } from '../models/userP';
import { UserU } from '../models/userU';
import { NgForm } from '@angular/forms';
import { BranchService } from './branch.service';
import { Branch } from '../models/branch';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private httpOptions;
  private apiServiceUrl;
  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    this.apiServiceUrl = localStorage.getItem('url_1');
  }

  constructor(private http: HttpClient){}

  public getUsers(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/user/all`, this.httpOptions)
  }
  public getUser(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/user/find/${id}`, this.httpOptions)
  }
  public addUser(user: NgForm): Observable<any>{
    this.init();
    console.log(user)
    alert(user.value.role.id);
    return this.http.post<UserP>(`${this.apiServiceUrl}/user/add`, {
      email: user.value.email,
      password: user.value.password,
      username : user.value.username,
      createdAt: new Date().toLocaleDateString(),
      active: true,
      employee: {
          id: user.value.employee.id,
      },
      roles: [{
        id: user.value.role.id
      }],
      branch: {
        id: user.value.branch.id,
      },
    },  this.httpOptions)
  }
  public updateUser(user: UserU): Observable<any>{
    this.init();
    console.log(user)
    return this.http.put<User>(`${this.apiServiceUrl}/user/update`, {
      id: user.id,
      username: user.username,
      password: user.password,
      createdAt: new Date().toLocaleDateString(),
      active: user.active,
      employee: { id: user.employee.id },
      roles: [ user.roles ],
      branch: { id: user.branch.id },
    },  this.httpOptions)
  }
  public deleteUser(userId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/user/delete/${userId}`, this.httpOptions)
  }

}
