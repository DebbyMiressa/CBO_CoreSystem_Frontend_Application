import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewModuleComponent } from './newModule/newModule.component';
import { ModuleTableComponent } from './moduleTable/moduleTable.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Module'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'viewModule'
      },
      {
        path: 'addDivison',
        component: NewModuleComponent,
        data: {
          title: 'New Divison'
        }
      },
      {
        path: 'viewModule',
        component: ModuleTableComponent,
        data: {
          title: 'Module Table'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule {
}
