import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CIPM } from '../models/cipm';
import { NgForm } from '@angular/forms';
import { CIPMP } from '../models/cipmP';

@Injectable({
  providedIn: 'root'
})
export class CIPMService {
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

  public getCIPMs(): Observable<any>{
    this.init();
    console.log(this.httpOptions)
    return this.http.get<any>(`${this.apiServiceUrl}/CIPM/getAll`, this.httpOptions);
  }
  public getCIPM(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/CIPM/find/${id}`, this.httpOptions)
  }
  public getCIPMForBranch(id: number): Observable<any>{
    this.init();
    console.log(`${this.apiServiceUrl}/CIPM/findByBranchId/${id}`)
    return this.http.get<any>(`${this.apiServiceUrl}/CIPM/findByBranchId/${id}`, this.httpOptions)
  }
  public getCIPMForDistrict(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/CIPM/findByDistrictId/${id}`, this.httpOptions)
  }
  public addCIPM(cipm: NgForm): Observable<any>{
    this.init();
    return this.http.post<CIPMP>(`${this.apiServiceUrl}/CIPM/add`, cipm , this.httpOptions)
  }
  public updateCIPM(cipm: CIPM): Observable<any>{
    this.init();
      return this.http.put<CIPM>(`${this.apiServiceUrl}/CIPM/update`,
      {
        id: cipm.id,
        borrowerName: cipm.borrowerName,
        mortgagorName: cipm.mortgagorName,
        loanAccount: cipm.loanAccount,
        loanType: cipm.loanType,
        collateralType:{
          id: cipm.collateralType.id
        },
        otherCollateralType: (cipm.otherCollateralType == undefined)? "" : cipm.otherCollateralType,
        insurancePolicyCoverageType:{
          id: cipm.insurancePolicyCoverageType.id
        },
        otherInsurancePolicyCoverageType: (cipm.otherInsurancePolicyCoverageType == undefined)? "" : cipm.otherInsurancePolicyCoverageType,
        insuredName: cipm.insuredName,
        insuranceExpireDate: cipm.insuranceExpireDate,
        branch:{
          id: cipm.branch.id
        }},  this.httpOptions)
  }
  public deleteCIPM(cipmId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/CIPM/delete/${cipmId}`, this.httpOptions)
  }
}
