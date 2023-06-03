import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../models/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

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

  public getAllDistricts(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/district/all`, this.httpOptions)
  }
  public getDistrict(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/district/find/${id}`, this.httpOptions)
  }
  public addDistrict(district: FormData): Observable<any>{
    this.init();
    return this.http.post<any>(`${this.apiServiceUrl}/district/add`, district, this.httpOptions)
  }

  public updateDistrict(district: District): Observable<any>{
    this.init();
    console.log(district);
    return this.http.put<District>(`${this.apiServiceUrl}/district/update`,
    {
      id: district.id,
      name: district.name,
    }
    , this.httpOptions)
  }
  public deleteDistrict(districtId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/district/delete/${districtId}`, this.httpOptions)
  }
}
