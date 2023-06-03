import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { count } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthorityService } from 'src/app/services/authority.service';


import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Authority } from 'src/app/models/authority';
import { DashboardV } from 'src/app/models/dashboardv';
import { ListFormat } from 'typescript/lib/tsserverlibrary';
//import { UserService } from '../../Services/user.service';
interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData, private authService: AuthorityService) {
  }

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Day')
  });
  public allUsers: number;
  public allAuths: number;
  public activeAuth: number;
  public usersd: User[];
  public authsd: Authority[];
  public dashdata: DashboardV;
  public numberofNewUsers: number;
  public femalepercent: number;
  public malepercent: number;
  public adminV: number;
  public userV: number;
  public directorV: number;
  public timeAgo: number;
  timeNow: Date;
  nowsec: number;

  ngOnInit(): void {
    this.initCharts();
    if (!localStorage.getItem('isReloaded')) {
      localStorage.setItem('isReloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('isReloaded');
    }
    console.log("email = "+localStorage.getItem('email'))
    console.log("access_token = "+localStorage.getItem('access_token'))
    console.log("access_token = "+localStorage.getItem('access_token'))
    console.log("url_0 = "+localStorage.getItem('url_0'))
    console.log("url_1 = "+localStorage.getItem('url_1'))
    console.log("url_2 = "+localStorage.getItem('url_2'))
    console.log("url_3 = "+localStorage.getItem('url_3'))
    console.log("role_0 = "+localStorage.getItem('role_0'))
    console.log("role_1 = "+localStorage.getItem('role_1'))
    console.log("name = "+localStorage.getItem('name'))
    console.log("division = "+localStorage.getItem('division'))
    console.log("branchId = "+localStorage.getItem('branchId'))
    console.log("module_0 = "+localStorage.getItem('module_0'))
    console.log("module_1 = "+localStorage.getItem('module_1'))
  }

  initCharts(): void {
    console.log("chart");
    console.log(this.dashdata);
    this.dashdata = {
      newUsers: [],
      allUsers: 0,
      activeAuth: 0,
      allAuth: 0,
      recentUsers: [{ name: "Default", lastlogin: "10:10:10", role: "Default" }],
      roleVisit: { admin: 0, director: 0, nuser: 0 },
      todayLogin: 0,
      pageViewToday: 0,
      maleUsers: 0,
      femaleUsers: 0,
      allEmployee: 0,
      allDivision: 0
    };
    this.dashdata.todayLogin = 9;


    this.authService.getDashboardData().subscribe(
      (response: DashboardV) => {
        this.numberofNewUsers = 0;
        this.dashdata = response;
        for (let i = 0; i < this.dashdata.newUsers.length; i++) {
          this.numberofNewUsers = this.numberofNewUsers + this.dashdata.newUsers[i];
        }
        this.femalepercent = Math.round((this.dashdata.femaleUsers / this.dashdata.allEmployee) * 100);
        this.malepercent = Math.round((100 - this.femalepercent));

        this.adminV = Math.round((this.dashdata.roleVisit.admin / this.dashdata.pageViewToday) * 100);
        this.directorV = Math.round((this.dashdata.roleVisit.director / this.dashdata.pageViewToday) * 100);
        this.userV = Math.round(100 - (this.adminV + this.directorV));

        for (let j = 0; j < this.dashdata.recentUsers.length; j++) {
          this.timeAgo = Number(this.dashdata.recentUsers[j].lastlogin.split(":")[0]) * 60 * 60 + Number(this.dashdata.recentUsers[j].lastlogin.split(":")[1]) * 60 + Number(this.dashdata.recentUsers[j].lastlogin.split(":")[2])
          this.timeNow = new Date()

          this.nowsec = Number(this.timeNow.getHours() * 60 * 60 + this.timeNow.getMinutes() * 60 + this.timeNow.getSeconds());

          this.timeAgo = this.nowsec - this.timeAgo;

          if (this.timeAgo < 60) {
            this.dashdata.recentUsers[j].lastlogin = this.timeAgo + " second ago";
          } else if (this.timeAgo > 3600) {
            this.dashdata.recentUsers[j].lastlogin = Math.round(this.timeAgo / 3600) + " hour ago";
          } else if (this.timeAgo >= 60) {
            this.dashdata.recentUsers[j].lastlogin = Math.round(this.timeAgo / 60) + " minute ago";
          } else {
            this.dashdata.recentUsers[j].lastlogin = "long time ago";
          }


        }
      }
    ),
      (errors: HttpErrorResponse) => {
        alert(errors);
      }
    this.chartsData.initMainChart('Day');
    this.mainChart = this.chartsData.mainChart;


  }

  setTrafficPeriod(value: string): void {
    alert("trrafic");

    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
