import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';

import { FormModule } from '@coreui/angular';
import { NewAuthorityComponent } from './newAuthority/newAuthority.component';
import { AuthorityTableComponent } from './authorityTable/authorityTable.component';
import { AuthorityRoutingModule } from './authority-routing.module';
import { IconModule } from '@coreui/icons-angular';
import {DialogModule} from 'primeng/dialog';


import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';
import { ShowComponent } from './show/show.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthorityRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    InputTextModule,
    DialogModule
  ],
  declarations: [
    NewAuthorityComponent,
    AuthorityTableComponent,
    ShowComponent

  ],
})
export class AuthorityModule {}
