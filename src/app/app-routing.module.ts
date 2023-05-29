import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './User/userLogin.component';
import { NewDivisonComponent } from './Authority_view/division/newDivision/newDivision.component';
import { NewEmployeeComponent } from './Authority_view/employee/newEmployee/newEmployee.component';
import { NewUserComponent } from './Authority_view/user/newUser/newUser.component';
import { AuthGuard} from './_guards/auth.guard';
import { NewBranchComponent } from './Authority_view/branch/newBranch/newBranch.component';
import { NewDistrictComponent } from './Authority_view/district/newDistrict/newDistrict.component';
import { NewCIPMComponent } from './operations/cipm/newCIPM/newCIPM.component';
import { NewDchequeComponent } from './operations/dcheque/newDcheque/newDcheque.component';
import { NewFraudComponent } from './operations/fraud/newFraud/newFraud.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'adminic', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'branchic', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'districtic', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'superadmin', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'bm', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'adminsasv', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'adminsanction', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path:'userPage',redirectTo: 'userPage', pathMatch: 'full'
  },
  {
    path: 'updateDivision/:id', redirectTo: 'updateDivision/:id', pathMatch: 'full'
  },
  {
    path: 'updateEmployee/:id', redirectTo: 'updateEmployee/:id', pathMatch: 'full'
  },
  {
    path: 'updateUser/:id', redirectTo: 'updateUser/:id', pathMatch: 'full'
  },
  {
    path: 'updateCIPM/:id', redirectTo: 'updateCIPM/:id', pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent, canActivate: [AuthGuard],
    data: {title: 'Home'},

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Authority_view/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path:'userPage',component: UserLoginComponent, canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent, canActivate: [AuthGuard],
    data: {title: 'Home'},

    children: [
      {
        path: 'updateDivision/:id', component: NewDivisonComponent, data: {title: 'Division / Update Division'}
      },
      {
        path: 'updateEmployee/:id', component: NewEmployeeComponent, data: {title: 'Employee / Update Employee'}
      },
      {
        path: 'updateUser/:id', component: NewUserComponent, data: {title: 'User / Update User'}
      },
      {
        path: 'updateCIPM/:id', component: NewCIPMComponent, data: {title: 'CIPM / Update CIPM'}
      },
      {
        path: 'updateBranch/:id', component: NewBranchComponent, data: {title: 'Branch / Update Branch'}
      },
      {
        path: 'updateDistrict/:id', component: NewDistrictComponent, data: {title: 'District / Update District'}
      },
      {
        path: 'updateDcheque/:id', component: NewDchequeComponent, data: {title: 'Dishonoured Cheque / Update Dishonoured Cheque'}
      },
      {
        path: 'updateFraud/:id', component: NewFraudComponent, data: {title: 'Incident Fraud Component / Update Incident Fraud Component'}
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./Authority_view/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./Authority_view/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'IC/user',
        loadChildren: () =>
          import('./Authority_view/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./Authority_view/employee/employee.module').then((m) => m.EmployeeModule)
      },
      {
        path: 'division',
        loadChildren: () =>
          import('./Authority_view/division/division.module').then((m) => m.DivisionModule)
      },
      {
        path: 'authority',
        loadChildren: () =>
          import('./Authority_view/authority/authority.module').then((m) => m.AuthorityModule)
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('./Authority_view/branch/branch.module').then((m) => m.BranchModule)
      },
      {
        path: 'district',
        loadChildren: () =>
          import('./Authority_view/district/district.module').then((m) => m.DistrictModule)
      },
      {
        path: 'IC/CIPM',
        loadChildren: () =>
          import('./operations/cipm/cipm.module').then((m) => m.CIPMModule)
      },
      {
        path: 'IC/Dcheque',
        loadChildren: () =>
          import('./operations/dcheque/dcheque.module').then((m) => m.DchequeModule)
      },
      {
        path: 'IC/Fraud',
        loadChildren: () =>
          import('./operations/fraud/fraud.module').then((m) => m.FraudModule)
      },
      {
        path: 'userLogin',
        loadChildren: () =>
          import('./User/userLogin.module').then((m) => m.UserLoginModule)
      },
    ]
  },
  {
    path: '**', redirectTo: 'login',  pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
