import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDistrictComponent } from './newDistrict/newDistrict.component';
import { DistrictTableComponent } from './districtTable/districtTable.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'District',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'viewDistrict',
      },
      {
        path: 'addDistrict',
        component: NewDistrictComponent,
        data: {
          title: 'New District',
        },
      },
      {
        path: 'viewDistrict',
        component: DistrictTableComponent,
        data: {
          title: 'District Table',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistrictRoutingModule {}

