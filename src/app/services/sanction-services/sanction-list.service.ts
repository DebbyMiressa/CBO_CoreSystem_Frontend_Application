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
import { AdverserResponseDetail } from '../../models/sanction-models/adverser/AdverserResponseDetail';
import { NbeBlackList } from '../../models/sanction-models/nbeblacklist/NbeBlackList';
import { UNindividual_ } from '../../models/sanction-models/UNindividual_';
import { UNentity_ } from 'src/app/models/sanction-models/UNentity_';
import { EU_ } from 'src/app/models/sanction-models/EU_';
import { UK_ } from 'src/app/models/sanction-models/UK_';
import { OFAC_ } from 'src/app/models/sanction-models/OFAC_';



@Injectable({
  providedIn: 'root'
})
export class SanctionListService {
  private httpOptions;
  private apiServiceUrl;
  private rootURL;
  private baseUNentityURL;
  private baseUNSanctions;
  private baseUNIdvidualURL;
  private baseUKURL;
  private baseUSURL;
  private basePEPURL;
  private baseEUURL;
  private baseAdverserURL;
  private baseNbeBlackList;


  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    this.apiServiceUrl = localStorage.getItem('url_4');
    this.rootURL = this.apiServiceUrl+"/"
    this.baseUNentityURL = this.apiServiceUrl+ "/search-un-entity-sanction/"
    this.baseUNSanctions = this.apiServiceUrl+ "/look/"
    this.baseUNIdvidualURL = this.apiServiceUrl+ "/search-un-individual-sanction/"
    this.baseUKURL = this.apiServiceUrl+ "/search-uk-sanction/"
    this.baseUSURL = this.apiServiceUrl+ "/search-sanction/"
    this.basePEPURL = this.apiServiceUrl+ "/search-sanction/"
    this.baseEUURL = this.apiServiceUrl+ "/search-eu-sanction/"
    this.baseAdverserURL = this.apiServiceUrl+ "/search-adverser-sanction/"
    this.baseNbeBlackList = this.apiServiceUrl+ "/search-nbe-black/"
  }

  constructor(private httpClient: HttpClient) { }

  //abdydidit 
  //get all UN individuals
  getAllUnIndividual():Observable<UNindividual_[]>{
    return this.httpClient.get<UNindividual_[]>('http://10.1.125.58:8084/api/v1/un_all_individuals');
  }

  getAllUnEntity():Observable<UNentity_[]>{
    return this.httpClient.get<UNentity_[]>('http://10.1.125.58:8084/api/v1/un_all_entities');
  }
   getAllEu():Observable<EU_[]>{
    return this.httpClient.get<EU_[]>('http://10.1.125.58:8084/api/v1/eu_all');
   }

   getAllUk():Observable<UK_[]>{
    return this.httpClient.get<UK_[]>('http://10.1.125.58:8084/api/v1/uk_all');
   }

   getAllNbe():Observable<NbeBlackList[]>{
    return this.httpClient.get<NbeBlackList[]>('http://10.1.125.58:8084/api/v1/nbebacklist');
   }

   getAllPep():Observable<PepResponseDetail[]>{
    return this.httpClient.get<PepResponseDetail[]>('http://10.1.125.58:8084/api/v1/pep-list');
   }
   getAllAdverser(): Observable<AdverserResponseDetail[]>{
    return this.httpClient.get<AdverserResponseDetail[]>('http://10.1.125.58:8084/api/v1/adverser-all');
   }
   getAllOfac(): Observable<OFAC_[]>{
    return this.httpClient.get<OFAC_[]>('http://10.1.125.58:8084/api/v1/ofac-sanctions');
   }

  //abdydiditends

  getEUSearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<NameAlias[]>(`${this.baseEUURL+fullName}`, this.httpOptions);
  }
  getUNSanctionResult(fullName:string):Observable<any>{
    this.init();
    return this.httpClient.get<UNSanction[]>(`${this.baseUNSanctions+fullName}`, this.httpOptions);
  }
  getUNEntitySearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<DataModel>(`${this.baseUNentityURL+fullName}`);
  }
  getUNIndividualSearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<UnIndividualResponseDetail[]>(`${this.baseUNIdvidualURL+fullName}`, this.httpOptions);
  }
  getUkSearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<Name[]>(`${this.baseUKURL+fullName}`, this.httpOptions);
  }
  getUSSearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<DataModel>(`${this.baseUSURL+fullName}`, this.httpOptions);
  }
  getPEPSearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<PepResponseDetail[]>(`${this.basePEPURL+fullName}`, this.httpOptions);
  }
  getAdverserSearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<AdverserResponseDetail[]>(`${this.baseAdverserURL+fullName}`, this.httpOptions);

  }
  getNbeBlackListSearchResult(fullName: string): Observable<any>{
    this.init();
    return this.httpClient.get<NbeBlackList[]>(this.baseNbeBlackList+fullName, this.httpOptions);
  }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    this.init();
    const data: FormData = new FormData();

    data.append('file', file);

    const newRequest = new HttpRequest('POST', 'http://192.168.137.163:8081/upload-sanction-file', data, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(newRequest);
  }


  // define function to upload files
  upload(formData: FormData): Observable<any> {
    this.init();
    return this.httpClient.post<string[]>('http://192.168.137.163:8081/upload-sanction-file', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // define function to download files
  download(filename: string): Observable<any> {
    this.init();
    return this.httpClient.get('http://192.168.137.163:8081/download-sanction-file/${filename}/', {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
public userDetail(Id: string): Observable<any>{
  this.init();
  return this.httpClient.get<DataModel>('http://192.168.137.163:8081/customer-details/'+Id, this.httpOptions);
}
public userEUDetail(Id: string): Observable<any>{
  this.init();
  console.log("UserEuDetail ID: ", Id);

  return this.httpClient.get<DataModel[]>('http://192.168.137.163:8081/eu-details/'+Id, this.httpOptions);
}
public userUkDetail(Id: string): Observable<any>{
  this.init();
  console.log("UserUkDetail ID: ", Id);
  return this.httpClient.get<ResponseDetail>('http://192.168.137.163:8081/uk-details/'+Id, this.httpOptions);
}
public userPEPDetail(Id: string): Observable<any>{
  this.init();
  console.log("UserPEPDetail ID: ", Id);
  return this.httpClient.get<PepResponseDetail[]>('http://192.168.137.163:8081/pep-details/'+Id, this.httpOptions);
}
public userUnIndividualDetail(Id: any): Observable<any>{
  this.init();
  return this.httpClient.get<UnIndividualResponseDetail[]>('http://192.168.137.163:8081/un-individual-details/'+Id, this.httpOptions)
}

public unSanctionDetail(Id: any): Observable<any>{
  this.init();
  return this.httpClient.get<UNSanction[]>('http://localhost:8081/look-id/'+Id, this.httpOptions)
}
}
