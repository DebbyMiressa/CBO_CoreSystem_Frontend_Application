import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './newuser/newuser.component';
import { UserTableComponent } from './usertable/usertable.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'viewICUsers',
      },
      {
        path: 'addUser',
        component: NewUserComponent,
        data: {
          title: 'New User',
        },
      },
      {
        path: 'viewICUsers',
        component: UserTableComponent,
        data: {
          title: 'User Table',
        },
      },
      {
        path: 'viewAllUsers',
        component: UserTableComponent,
        data: {
          title: 'User Table',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

