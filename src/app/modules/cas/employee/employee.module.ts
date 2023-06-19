import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AnimateModule } from 'primeng/animate';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RadioButtonModule } from 'primeng/radiobutton';

import {
  ButtonGroupModule,
  CardModule,
  CollapseModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { NewEmployeeComponent } from './newemployee/newemployee.component';
import { EmployeeTableComponent } from './employeetable/employeetable.component';

@NgModule({
  declarations: [
    NewEmployeeComponent,
    EmployeeTableComponent
  ],
  imports: [
    AnimateModule,
    CommonModule,
    ConfirmPopupModule,
    ProgressSpinnerModule,
    EmployeeRoutingModule,
    BlockUIModule,
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormModule,
    ReactiveFormsModule,
    CalendarModule,
    NavbarModule,
    TableModule,
    CollapseModule,
    NavModule,
    TableModule,
    NavbarModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule,
    FileUploadModule,
    KeyFilterModule,
    RadioButtonModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class EmployeeModule {
}
