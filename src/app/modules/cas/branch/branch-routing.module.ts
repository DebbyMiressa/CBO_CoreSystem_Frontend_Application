import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBranchComponent } from './newBranch/newBranch.component';
import { BranchTableComponent } from './branchTable/branchTable.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Branch'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'branchTable'
      },
      {
        path: 'addBranch',
        component: NewBranchComponent,
        data: {
          title: 'New Branch'
        }
      },
      {
        path: 'viewBranch',
        component: BranchTableComponent,
        data: {
          title: 'Branch Table'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule {
}
