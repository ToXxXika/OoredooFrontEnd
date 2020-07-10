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
import { BoutiqueSidebarComponent } from './boutique-sidebar/boutique-sidebar.component';
import { CoursierSidebarComponent } from './coursier-sidebar/coursier-sidebar.component';

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
    SidebarComponent,
    BoutiqueSidebarComponent,
    CoursierSidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BoutiqueSidebarComponent
  ]
})
export class ComponentsModule { }
