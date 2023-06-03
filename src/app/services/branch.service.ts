import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
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

  public getBranches(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/branch/all`, this.httpOptions)
  }
  public getBranch(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/branch/find/${id}`, this.httpOptions)

  }
  public addBranch(branch: NgForm): Observable<any>{
    this.init();
    return this.http.post<any>(`${this.apiServiceUrl}/branch/add`, branch, this.httpOptions)
  }
  public updateBranch(branch: Branch): Observable<any>{
    this.init();
    console.log(branch);
    return this.http.put<Branch>(`${this.apiServiceUrl}/branch/update`,
    {
      id: branch.id,
      code: branch.code,
      name: branch.name,
      mnemonic : branch.mnemonic,
      location: branch.location,
      district: {
          id: branch.district.id
      },
    }
    , this.httpOptions)
  }
  public deleteBranch(branchId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/branch/delete/${branchId}`, this.httpOptions)
  }

}
