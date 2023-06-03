import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FraudCategory } from '../models/fraudCategory';
import { CommonP } from '../models/commonP';

@Injectable({
  providedIn: 'root'
})
export class FraudCategoryService {

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

  public getFraudCategories(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/fraudCategory/getAll`, this.httpOptions)
  }
  public getFraudCategory(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/fraudCategory/find/${id}`, this.httpOptions)
  }
  public getFraudCategoryForBranch(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/fraudCategory/findByBranchId/${id}`, this.httpOptions)
  }
  public getFraudCategoryForDistrict(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/fraudCategory/findByDistrictId/${id}`, this.httpOptions)
  }
  public addFraudCategory(fraudCategory: NgForm): Observable<any>{
    this.init();
    return this.http.post<CommonP>(`${this.apiServiceUrl}/fraudCategory/add`, fraudCategory , this.httpOptions)
  }
  public updateFraudCategory(fraudCategory: FraudCategory): Observable<any>{
    this.init();
      return this.http.put<FraudCategory>(`${this.apiServiceUrl}/fraudCategory/update`, fraudCategory, this.httpOptions)
  }
  public deleteFraudCategory(fraudCategoryId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/fraudCategory/delete/${fraudCategoryId}`, this.httpOptions)
  }
}
