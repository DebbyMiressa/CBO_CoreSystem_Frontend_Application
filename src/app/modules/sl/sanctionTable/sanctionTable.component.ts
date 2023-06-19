//prioritize these tasks and identify things you should do prior to server configuration and after that. basic funtionality is done before server configuration
//things to add
//at first loads all data but while it does that instead of making users wait let them search 
//have easy way of getting from back end that goes with my models
//also check and if document have name in other language enable them to search by that
//try ai
//show details 

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, Message, MessageService, PrimeNGConfig, SortEvent } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Name } from '../../../models/sanction-models/uk/Name';
import { ResponseDetail } from '../../../models/sanction-models/uk/ResponseDetail';
import { NameAlias } from '../../../models/sanction-models/eu/NameAlias';
import { ModalService } from '../../../services/sanction-services/modal.service';
import { SanctionListService } from '../../../services/sanction-services/sanction-list.service';
import { DataModel } from '../../../models/sanction-models/DataModel';
import { UNSanction } from '../../../models/sanction-models/UNSaction';
import { PepResponseDetail } from '../../../models/sanction-models/pep/PepResponseDetail';
import { UnIndividualResponseDetail } from '../../../models/sanction-models/un/UnIndividualResponse';
import { AdverserResponseDetail } from '../../../models/sanction-models/adverser/AdverserResponseDetail';
import { NbeBlackList } from '../../../models/sanction-models/nbeblacklist/NbeBlackList';
import { combineLatest, combineLatestAll, combineLatestWith, filter, forkJoin } from 'rxjs';
import { UNindividual_ } from 'src/app/models/sanction-models/UNindividual_';
import { UNentity_ } from 'src/app/models/sanction-models/UNentity_';
import { EU_ } from 'src/app/models/sanction-models/EU_';
import { UK_ } from 'src/app/models/sanction-models/UK_';
import { OFAC_ } from 'src/app/models/sanction-models/OFAC_';



@Component({
  selector: 'app-accordions',
  templateUrl: './sanctiontable.component.html',
  styleUrls: ['./sanctiontable.component.scss']
})
export class SanctionTableComponent implements OnInit {
//abdydidit
  all_un_individual!: UNindividual_[];
  all_un_entities!: UNentity_[];
  all_eu_sanction!: EU_[];
  all_uk_sanction!: UK_[];
  all_nbe_sanction!: NbeBlackList[];
  all_pep_sanction!: PepResponseDetail[];
  all_adverser_sanction!: AdverserResponseDetail[];
  all_ofac_sanction!: OFAC_[];
//asro stands for all search results of
  asro_all_un_individual: Array<UNindividual_>;
  asro_all_un_entities!: Array<UNentity_>;
  asro_all_eu_sanction!: Array<EU_>;
  asro_all_uk_sanction!: Array<UK_>;
  asro_all_nbe_sanction!: Array<NbeBlackList>;
  asro_all_pep_sanction!: Array<PepResponseDetail>
  asro_all_adverser_sanction!: Array<AdverserResponseDetail>;
  asro_all_ofac_sanction!: Array<OFAC_>;

 // for modal purpose 
 displayDialog = false;
selectedData: any;

showDialog(data: any) {
    this.selectedData = data;
    this.displayDialog = true;
}

get selectedDataProperties() {
  if (!this.selectedData) {
      return [];
  }
  return Object.entries(this.selectedData).map(([property, value]) => ({ property, value }));
}

isObject(value: any) {
  return typeof value === 'object' && value !== null;
}
//abdydiditends

  fullName: string = '';
  nameList: Name[];
  len: number;
  detailRetrieved: boolean = false;
  responseDetail: ResponseDetail;
  nameAliasList!: NameAlias[];
  visible: boolean;
  

  constructor(private router: Router, public modalService: ModalService, private sanctionListService: SanctionListService,private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.sanctionListService.getAllUnIndividual().subscribe(data => {
      this.all_un_individual = data; // assign the data returned by the API to a local variable
    });
    this.sanctionListService.getAllUnEntity().subscribe(data => {
      this.all_un_entities = data; 
    });
    this.sanctionListService.getAllEu().subscribe(data => {
      this.all_eu_sanction = data; 
    });
    this.sanctionListService.getAllUk().subscribe(data => {
      this.all_uk_sanction = data; 
    });
    this.sanctionListService.getAllNbe().subscribe(data => {
      this.all_nbe_sanction = data;
    })
    this.sanctionListService.getAllPep().subscribe(data => {
      this.all_pep_sanction = data;
    })
    this.sanctionListService.getAllAdverser().subscribe(data => {
      this.all_adverser_sanction = data;
    })
    this.sanctionListService.getAllOfac().subscribe(data => {
      this.all_ofac_sanction = data;
    })
 
  }



 

  title = 'rms';
  public isLoggedIn() {

  }
  public logout() {

    this.router.navigate(['/'])

  }
  reset() { }
  dataset: [];
  public sanctionData = [];
  searchValue: string = '';
  names: Name[];
  dataUkChecker: number = -1;
  dataEuChecker: number = -1;
  dataModel: DataModel;
  unSanction: UNSanction;
  dataModelList: DataModel[];
  unSanctionList:UNSanction[];

  dataPepChecker: number = -1;
  dataUnIndividualChecker: number= -1;
  dataUnSanctionChecker: number= -1;
  pepResponseDetailList: PepResponseDetail[];
  pepResponseDetails: PepResponseDetail[];
  pepData: any[];
  unIndividualResponseDetailList : UnIndividualResponseDetail[];
  unIndividualResponses: UnIndividualResponseDetail[];
  dataAdverserChecker:number= -1
  adverserResponseDetailList: AdverserResponseDetail[];
  adverserResponses: AdverserResponseDetail[];
  dataNbeChecker: number =-1;
  nbeBlackListList: NbeBlackList[];

  //abdydiditstarts



  public getSearchResult(searchResult: string){

    function search(arrayOfObjects, typeofarray) {
      if (!arrayOfObjects) {
        console.log('Error: arrayOfObjects is undefined');
        return [];
    }
      if (searchResult === '') {
          return [];
      }
      return arrayOfObjects.filter(obj => {
          let concatenatedNames;
          if (typeofarray == 'all_un_individual') {
              concatenatedNames = [obj.firstName, obj.secondName, obj.thirdName, obj.fourthName].map(name => (name || '').trim()).join(' ');
          } else if (typeofarray == 'all_un_entities') {
              concatenatedNames = [obj.firstName, obj.secondName, obj.thirdName].map(name => (name || '').trim()).join(' ');
          } else if (typeofarray == 'all_eu_sanction') {
            if (obj.nameAlias && obj.nameAlias.length > 0 && typeof obj.nameAlias[0].wholeName === 'string') {
              concatenatedNames = obj.nameAlias[0].wholeName;
          }  
          }else if (typeofarray == 'all_uk_sanction') {
            if (obj.names && obj.names.nameList && obj.names.nameList.length > 0) {
                concatenatedNames = obj.names.nameList.map(name => [name.name1, name.name2, name.name3, name.name4, name.name5, name.name6].map(name => (name || '').trim()).join(' ')).join(' ');
            } else {
                console.log('Error: names or nameList property is missing or invalid');
            }
        } else if(typeofarray == 'all_nbe_sanction'){
          concatenatedNames = obj.name;
        }else if(typeofarray == 'all_pep_sanction'){
          concatenatedNames = [obj.nameInEng, obj.nameInAmh].map(name => (name || '').trim()).join(' ');
        } else if(typeofarray == 'all_adverser_sanction'){
          concatenatedNames = obj.name;
        } else if(typeofarray == 'all_ofac_sanction'){
          concatenatedNames = obj.name;
        }
          if(concatenatedNames != undefined){
            return concatenatedNames.toLowerCase().includes(searchResult.toLowerCase());
          }
      
      });
  }
  
  this.asro_all_un_individual = search(this.all_un_individual, 'all_un_individual');
  this.asro_all_un_entities = search(this.all_un_entities, 'all_un_entities');
  this.asro_all_eu_sanction = search(this.all_eu_sanction,'all_eu_sanction');
  this.asro_all_uk_sanction = search(this.all_uk_sanction, 'all_uk_sanction');
  this.asro_all_nbe_sanction = search(this.all_nbe_sanction, "all_nbe_sanction");
  this.asro_all_pep_sanction = search(this.all_pep_sanction, 'all_pep_sanction');
  this.asro_all_adverser_sanction = search(this.all_adverser_sanction, 'all_adverser_sanction');
  this.asro_all_ofac_sanction = search(this.all_ofac_sanction, 'all_ofac_sanction');
  console.log(this.all_pep_sanction);

 

        }
        //abdydiditends
  
}


