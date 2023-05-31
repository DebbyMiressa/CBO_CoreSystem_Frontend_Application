import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { DataModel } from '../../models/sanction-models/DataModel';
import { UNSanction } from '../../models/sanction-models//UNSaction';
import { User } from '../../models/sanction-models/User';

import { NameAlias } from '../../models/sanction-models/eu/NameAlias';
import { SanctionEntity } from '../../models/sanction-models/eu/SanctionEntity';
import { Name } from '../../models/sanction-models/uk/Name';
import { ResponseDetail } from '../../models/sanction-models/uk/ResponseDetail';
import { PepResponseDetail } from '../../models/sanction-models/pep/PepResponseDetail';
import { UnIndividualResponseDetail } from '../../models/sanction-models/un/UnIndividualResponse';
import { AdverserResponseDetail } from '../../models/sanction-models//adverser/AdverserResponseDetail';
import { NbeBlackList } from '../../models/sanction-models/nbeblacklist/NbeBlackList';



@Injectable({
  providedIn: 'root'
})
export class SanctionListService {

  private rootURL ="http://localhost:8081/api/v1/"
  private baseUNentityURL ="http://localhost:8081/api/v1/search-un-entity-sanction/"
  private baseUNSanctions ="http://localhost:8081/api/v1/look/"
  private baseUNIdvidualURL ="http://localhost:8081/api/v1/search-un-individual-sanction/"
  private baseUKURL ="http://localhost:8081/api/v1/search-uk-sanction/"
  private baseUSURL ="http://localhost:8081/api/v1/search-sanction/"
  private basePEPURL ="http://localhost:8081/api/v1/search-sanction/"
  private baseEUURL ="http://localhost:8081/api/v1/search-eu-sanction/"
  private baseAdverserURL ="http://localhost:8081/api/v1/search-adverser-sanction/"
  private baseNbeBlackList= "http://localhost:8081/api/v1/search-nbe-black/"
  constructor(private httpClient: HttpClient) { }
  
  getEUSearchResult(fullName: string): Observable<NameAlias[]>{
    return this.httpClient.get<NameAlias[]>(`${this.baseEUURL+fullName}`);
  }
  getUNSanctionResult(fullName:string):Observable<UNSanction[]>{
    return this.httpClient.get<UNSanction[]>(`${this.baseUNSanctions+fullName}`);
  }
  getUNEntitySearchResult(fullName: string): Observable<DataModel>{
    return this.httpClient.get<DataModel>(`${this.baseUNentityURL+fullName}`);
  }
  getUNIndividualSearchResult(fullName: string): Observable<UnIndividualResponseDetail[]>{
    return this.httpClient.get<UnIndividualResponseDetail[]>(`${this.baseUNIdvidualURL+fullName}`);
  }
  getUkSearchResult(fullName: string): Observable<Name[]>{
    return this.httpClient.get<Name[]>(`${this.baseUKURL+fullName}`);
  }
  getUSSearchResult(fullName: string): Observable<DataModel>{
    return this.httpClient.get<DataModel>(`${this.baseUSURL+fullName}`);
  }
  getPEPSearchResult(fullName: string): Observable<PepResponseDetail[]>{
    return this.httpClient.get<PepResponseDetail[]>(`${this.basePEPURL+fullName}`);
  }
  getAdverserSearchResult(fullName: string): Observable<AdverserResponseDetail[]>{
    return this.httpClient.get<AdverserResponseDetail[]>(`${this.baseAdverserURL+fullName}`);

  }
  getNbeBlackListSearchResult(fullName: string): Observable<NbeBlackList[]>{
    return this.httpClient.get<NbeBlackList[]>(this.baseNbeBlackList+fullName);
  }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();

    data.append('file', file);

    const newRequest = new HttpRequest('POST', 'http://192.168.137.163:8081/api/v1/upload-sanction-file', data, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(newRequest);
  }


  // define function to upload files
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.httpClient.post<string[]>('http://192.168.137.163:8081/api/v1/upload-sanction-file', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.get('http://192.168.137.163:8081/api/v1/download-sanction-file/${filename}/', {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
public userDetail(Id: string): Observable<DataModel>{

  return this.httpClient.get<DataModel>('http://192.168.137.163:8081/api/v1/customer-details/'+Id);
}
public userEUDetail(Id: string): Observable<DataModel[]>{
  console.log("UserEuDetail ID: ", Id);

  return this.httpClient.get<DataModel[]>('http://192.168.137.163:8081/api/v1/eu-details/'+Id);
}
public userUkDetail(Id: string): Observable<ResponseDetail>{
  console.log("UserUkDetail ID: ", Id);
  return this.httpClient.get<ResponseDetail>('http://192.168.137.163:8081/api/v1/uk-details/'+Id);
}
public userPEPDetail(Id: string): Observable<PepResponseDetail[]>{
  console.log("UserPEPDetail ID: ", Id);
  return this.httpClient.get<PepResponseDetail[]>('http://192.168.137.163:8081/api/v1/pep-details/'+Id);
}
public userUnIndividualDetail(Id: any): Observable<UnIndividualResponseDetail[]>{
  return this.httpClient.get<UnIndividualResponseDetail[]>('http://192.168.137.163:8081/api/v1/un-individual-details/'+Id)
}

public unSanctionDetail(Id: any): Observable<UNSanction[]>{
  return this.httpClient.get<UNSanction[]>('http://localhost:8081/api/v1/look-id/'+Id)
}
}
