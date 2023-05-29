import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDchequeComponent } from './newDcheque/newDcheque.component';
import { DchequeTableComponent } from './DchequeTable/DchequeTable.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dishonored Cheque',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'viewDcheque',
      },
      {
        path: 'addDcheque',
        component: NewDchequeComponent,
        data: {
          title: 'New Dishonoured Cheque',
        },
      },
      {
        path: 'viewDcheque',
        component: DchequeTableComponent,
        data: {
          title: 'Dishonoured Cheque Table',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DchequeRoutingModule {}

