import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from "primeng/api";
import {ToastModule} from 'primeng/toast';

import { FormModule } from '@coreui/angular';
import { NewModuleComponent } from './newModule/newModule.component';
import { ModuleTableComponent } from './moduleTable/moduleTable.component';
import { ModuleRoutingModule } from './module-routing.module';
import { IconModule } from '@coreui/icons-angular';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';

import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  CardModule,
  CarouselModule,
  CollapseModule,
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    ModuleRoutingModule,
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
    FileUploadModule,
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
    ConfirmPopupModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule
  ],
  declarations: [
    NewModuleComponent,
    ModuleTableComponent,
  ],
  providers: [ConfirmationService, MessageService]
})
export class ModuleModule {}
