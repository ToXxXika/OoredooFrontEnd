import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../../pages/register/register.component';
import {ToastModule} from "primeng/toast";
import {TableModule} from 'primeng/table';
import {ButtonModule} from "primeng/button";
import {MenuModule} from 'primeng/menu';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {TransfertComponent} from '../../pages/transfert/transfert.component';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule, ChartModule, DialogModule, MessageModule, PanelModule} from 'primeng';
import {KeyFilterModule} from 'primeng/keyfilter';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ToastModule,
    TableModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    PanelModule,
    DialogModule,
    MessageModule,
    CardModule,
    KeyFilterModule,
    ChartModule


  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    RegisterComponent,
    TransfertComponent
  ]
})

export class AdminLayoutModule {}
