import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewEmployeeComponent } from './newemployee/newemployee.component';
import { EmployeeTableComponent } from './employeetable/employeetable.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employee'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'viewEmployee'
      },
      {
        path: 'addEmployee',
        component: NewEmployeeComponent,
        data: {
          title: 'New Employee'
        }
      },
      {
        path: 'viewEmployee',
        component: EmployeeTableComponent,
        data: {
          title: 'Employee Table'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
