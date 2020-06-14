import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ButtonModule} from "primeng/button";
import {TreeTableModule} from 'primeng/treetable';
import {TableModule} from "primeng/table";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        ButtonModule,
        TreeTableModule,
        TableModule


    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
