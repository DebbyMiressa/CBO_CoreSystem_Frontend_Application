import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanctionTableComponent } from './sanctiontable/sanctiontable.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sanction List',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'View Sanction List',
      },
      {
        path: 'viewSanction',
        component: SanctionTableComponent,
        data: {
          title: 'View Sanction List',
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

