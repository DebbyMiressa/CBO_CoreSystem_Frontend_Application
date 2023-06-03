import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Fraud } from '../models/fraud';
import { FraudP } from '../models/fraudP';

@Injectable({
  providedIn: 'root'
})
export class FraudService {

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

  public getFrauds(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/incidentFraudReport/getAll`, this.httpOptions)
  }
  public getSize(): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/incidentFraudReport/getSize`, this.httpOptions)
  }
  public getFraud(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/incidentFraudReport/find/${id}`, this.httpOptions)
  }
  public getFraudForBranch(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/incidentFraudReport/findByBranchId/${id}`, this.httpOptions)
  }
  public getFraudForDistrict(id: number): Observable<any>{
    this.init();
    return this.http.get<any>(`${this.apiServiceUrl}/incidentFraudReport/findByDistrictId/${id}`, this.httpOptions)
  }
  public addFraud(fraud: NgForm): Observable<any>{
    this.init();
    return this.http.post<FraudP>(`${this.apiServiceUrl}/incidentFraudReport/add`, fraud, this.httpOptions)
  }
  public authorizeFraud(id: number): Observable<any>{
    this.init();
    return this.http.patch<any>(`${this.apiServiceUrl}/incidentFraudReport/authorize/${id}`, this.getFraud(id), this.httpOptions)
  }
  public updateFraud(fraud: Fraud): Observable<any>{
    this.init();
    alert(fraud.fraudType)
    console.log("fraud = ", fraud)
      return this.http.put<Fraud>(`${this.apiServiceUrl}/incidentFraudReport/update`,
      {
        id: fraud.id,
        caseId: fraud.caseId,
        caseStatus: {
          id: fraud.caseStatus.id
        },
        caseAuthorized: fraud.caseAuthorized,
        fraudCause: fraud.fraudCause,
        fraudAmount: fraud.fraudAmount,
        fraudCategory: {
          id: fraud.fraudCategory.id
        },
        otherFraudCategory: fraud.otherFraudCategory,
        fraudType: {
          id: fraud.fraudType.id
        },
        otherFraudType: fraud.otherFraudType,
        fraudOccuranceDate: fraud.fraudOccuranceDate,
        fraudDetectionDate: fraud.fraudDetectionDate,
        fraudOccurancePlace: fraud.fraudOccurancePlace,
        fraudCommitingTechnique: fraud.fraudCommitingTechnique,
        reasonForDelay: fraud.reasonForDelay,
        reasonForFailedFraudAttempt: fraud.reasonForFailedFraudAttempt,
        amountRecovered: fraud.amountRecovered,
        actionTaken: fraud.actionTaken,
        suspectedFraudsterAddress: fraud.suspectedFraudsterAddress,
        suspectedFraudsterName: fraud.suspectedFraudsterName,
        suspectedFraudsterProfession: {
          id: fraud.suspectedFraudsterProfession.id
        },
        otherSuspectedFraudsterProfession: fraud.otherSuspectedFraudsterProfession,
        otherComment: fraud.otherComment,
        branch: {
          id: fraud.branch.id
        },
      }, this.httpOptions)
  }
  public deleteFraud(fraudId: number): Observable<any>{
    this.init();
    return this.http.delete<void>(`${this.apiServiceUrl}/incidentFraudReport/delete/${fraudId}`, this.httpOptions)
  }
}
