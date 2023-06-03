import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { JwtResponse } from '../models/JwtResponse';

interface LoginResponse {
  access_token: string;
  data: any;
  name: string;
  status: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  basePath = 'http://10.1.11.44:8083';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  // Verify user credentials on server to get token
  loginForm(data: any): Observable<JwtResponse> {
    localStorage.clear();
    return this.http
      .post<JwtResponse>(this.basePath + '/auth/login', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: JwtResponse) {
    const role = resp?.user?.roles[0]?.name;
    console.log("rrrrrrrrole = "+ role)
    if (role == "ROLE_SUPER_ADMIN" ||
        role == "ROLE_IC_ADMIN" ||
        role =="ROLE_SASV_ADMIN" ||
        role =="ROLE_SASV_VIEW" ||
        role =="ROLE_SANCTION_ADMIN" ||
        role =="ROLE_SANCTION_VIEW" ||
        role =="ROLE_BRANCH_IC" ||
        role =="ROLE_BRANCH_MANAGER" ||
        role =="ROLE_DISTRICT_IC"
        ) {

      this.router.navigate(['/dashboard']);
    }

    localStorage.clear();
    localStorage.setItem('email', resp?.user?.employee?.email);
    localStorage.setItem('access_token', resp?.accessToken);
    for (let i = 0; i < resp?.user?.roles.length; i++) {
      localStorage.setItem('role_' + i, resp?.user?.roles[i]?.name);
    }
    localStorage.setItem('number_of_roles', resp?.user?.roles.length.toString())
    localStorage.setItem('number_of_modules', resp?.user?.modules.length.toString())
    for (let i = 0; i < resp?.user?.modules.length; i++) {
      localStorage.setItem('module_' + i, resp?.user?.modules[i].status.toString());
    }
    for (let i = 1; i <= resp?.user.modules.length + 1; i++) {
      if (i == 1) {
        localStorage.setItem('url_1', this.basePath);
      } else {
        localStorage.setItem('url_' + (i), resp?.user?.modules[i-2].url);
      }
    }

    localStorage.setItem('name', resp?.user?.employee?.givenName + " " + resp?.user?.employee?.fatherName);
    localStorage.setItem('division', resp?.user?.employee?.division?.name);
    localStorage.setItem('branchId', resp?.user?.branch?.id.toString());

    console.log("email = " + localStorage.getItem('email'))
    console.log("access_token = " + localStorage.getItem('access_token'))
    console.log("url_0 = " + localStorage.getItem('url_0'))
    console.log("url_1 = " + localStorage.getItem('url_1'))
    console.log("url_2 = " + localStorage.getItem('url_2'))
    console.log("role_0 = " + localStorage.getItem('role_0'))
    console.log("name = " + localStorage.getItem('name'))
    console.log("division = " + localStorage.getItem('division'))
    console.log("branchId = " + localStorage.getItem('branchId'))
    console.log("module_1 = " + localStorage.getItem('module_1'))
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  getToken(i) {
    return localStorage.getItem('access_token');
  }
  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
