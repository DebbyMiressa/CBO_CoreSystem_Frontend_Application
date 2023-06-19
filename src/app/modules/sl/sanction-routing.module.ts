import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanctionTableComponent } from './sanctiontable/sanctiontable.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Search',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'View ',
      },
      {
        path: 'viewSanction',
        component: SanctionTableComponent,
        data: {
          title: 'View',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SanctionRoutingModule {}

