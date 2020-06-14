import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../../pages/register/register.component';
import {ToastModule} from "primeng/toast";
import {TableModule} from 'primeng/table';
import {ButtonModule} from "primeng/button";
import {MenuModule} from 'primeng/menu';


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


  ],
  declarations: [
    //to delete useless components

    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    RegisterComponent
  ]
})

export class AdminLayoutModule {}