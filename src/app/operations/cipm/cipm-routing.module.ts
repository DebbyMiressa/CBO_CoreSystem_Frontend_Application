import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCIPMComponent } from './newCIPM/newCIPM.component';
import { CIPMTableComponent } from './CIPMTable/CIPMTable.component';
import { NewCTComponent } from './newCT/newCT.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Collateral Insurance Policy Monitoring',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'View Collateral Insurance Policy Monitoring',
      },
      {
        path: 'addCIPM',
        component: NewCIPMComponent,
        data: {
          title: 'Add New Collateral Insurance Data',
        },
      },
      {
        path: 'viewCIPM',
        component: CIPMTableComponent,
        data: {
          title: 'View Collateral Insurance Policy Monitoring',
        },
      },
      {
        path: 'addCT',
        component: NewCTComponent,
        data: {
          title: 'Collateral Type',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CIPMRoutingModule {}

