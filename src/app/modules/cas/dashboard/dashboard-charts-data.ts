import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { DashboardV } from 'src/app/models/dashboardv';
import { AuthorityService } from 'src/app/services/authority.service';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor(private authService: AuthorityService) {
    console.log(this.dashdata);
    this.dashdata = {
      newUsers: [50, 60, 8, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        this.dashdata = response;
        this.initMainChart();
      }
    ),
      (errors: HttpErrorResponse) => {
        alert(errors);
        this.initMainChart();
      };



  }

  public mainChart: IChartProps = {};
  public dashdata: DashboardV;

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initMainChart(period: string = 'Day') {
    this.dashdata = {
      newUsers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    this.authService.getDashboardData().subscribe(
      (response: DashboardV) => {

        this.dashdata = response;
        console.log(this.dashdata.newUsers);
        this.initMainChartLtr();
      }
    ),
      (errors: HttpErrorResponse) => {
        alert(errors);
      };
    this.initMainChartLtr();
  }
  initMainChartLtr() {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    // mainChart
    // mainChart
    this.mainChart['elements'] = 31;
    this.mainChart['Data1'] = [];


    for (let i = 0; i <= this.mainChart['elements']; i++) {
      //alert(i);

      this.mainChart['Data1'].push(this.dashdata.newUsers[i]);

    }

    let labels: string[] = [];

    labels = [
      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18",
      "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ]


    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5]
      }
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Current',
        ...colors[0]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function (context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 50,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(50 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

}
