import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {InputTextModule} from "primeng/inputtext";
import { TestToastComponent } from './test-toast/test-toast.component';
import {BrowserModule} from "@angular/platform-browser";
import {MenuModule} from "primeng/menu";
import { BoutiqueLayoutComponent } from './layouts/boutique-layout/boutique-layout.component';
import {RouteguardService} from './Services/routeguard.service';
import {RouteguardAgentService} from './Services/routeguard-agent.service';
import {RouteguardCoursierService} from './Services/routeguard-coursier.service';
import { CoursierLayoutComponent } from './layouts/coursier-layout/coursier-layout.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    InputTextModule,
    MenuModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BoutiqueLayoutComponent,
    CoursierLayoutComponent,


  ],
  providers: [RouteguardService,RouteguardAgentService,RouteguardCoursierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
