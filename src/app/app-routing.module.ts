import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './login/login.component';
import { NewDivisonComponent } from './modules/cas/division/newDivision/newDivision.component';
import { NewEmployeeComponent } from './modules/cas/employee/newemployee/newemployee.component';
import { NewUserComponent } from './modules/cas/user/newuser/newuser.component';
import { AuthGuard} from './_guards/auth.guard';
import { NewBranchComponent } from './modules/cas/branch/newbranch/newbranch.component';
import { NewDistrictComponent } from './modules/cas/district/newDistrict/newDistrict.component';
import { NewCIPMComponent } from './modules/ic/cipm/newCIPM/newCIPM.component';
import { NewDchequeComponent } from './modules/ic/dcheque/newDcheque/newDcheque.component';
import { NewFraudComponent } from './modules/ic/fraud/newFraud/newFraud.component';
import { sasvViewerLoginComponent } from './modules/sasv/sasvViewer/sasvViewerLogin.component';
import { LetterComponent } from './modules/sasv/memo/letter/letter.component';
import { MemoComponent } from './modules/sasv/memo/memo.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full'
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
    component: DefaultLayoutComponent,canActivate: [AuthGuard],
    data: {title: 'Home'},

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/cas/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path:'sasvPage',component: sasvViewerLoginComponent, canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,canActivate: [AuthGuard],
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
          import('./modules/cas/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/cas/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'IC/user',
        loadChildren: () =>
          import('./modules/cas/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./modules/cas/employee/employee.module').then((m) => m.EmployeeModule)
      },
      {
        path: 'division',
        loadChildren: () =>
          import('./modules/cas/division/division.module').then((m) => m.DivisionModule)
      },
      {
        path: 'module',
        loadChildren: () =>
          import('./modules/cas/module/module.module').then((m) => m.ModuleModule)
      },
      {
        path: 'authority',
        loadChildren: () =>
          import('./modules/sasv/authority/authority.module').then((m) => m.AuthorityModule)
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('./modules/cas/branch/branch.module').then((m) => m.BranchModule)
      },
      {
        path: 'district',
        loadChildren: () =>
          import('./modules/cas/district/district.module').then((m) => m.DistrictModule)
      },
      {
        path: 'IC/CIPM',
        loadChildren: () =>
          import('./modules/ic/cipm/cipm.module').then((m) => m.CIPMModule)
      },
      {
        path: 'Sanction',
        loadChildren: () =>
          import('./modules/sl/sanction.module').then((m) => m.SanctionModule)
      },
      {
        path: 'IC/Dcheque',
        loadChildren: () =>
          import('./modules/ic/dcheque/dcheque.module').then((m) => m.DchequeModule)
      },
      {
        path: 'IC/Fraud',
        loadChildren: () =>
          import('./modules/ic/fraud/fraud.module').then((m) => m.FraudModule)
      },
      {
        path: 'sasvViewerLogin',
        loadChildren: () =>
          import('./modules/sasv/sasvViewer/sasvViewerLogin.module').then((m) => m.sasvViewerLoginModule)
      },
      {
        path:'letter', component: LetterComponent, canActivate: [AuthGuard],
      },
      {
        path: 'director', component: MemoComponent, canActivate: [AuthGuard],
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
