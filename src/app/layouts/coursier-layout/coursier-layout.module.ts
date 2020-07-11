import {TableModule} from 'primeng/table';
import {CoursierComponent} from '../../pages/coursier/coursier.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoursierLayoutsRoutes} from './coursier-layout.routing';
import {ButtonModule, ToastModule} from 'primeng';
import {FormsModule} from '@angular/forms';



@NgModule({
  imports: [
    RouterModule.forChild(CoursierLayoutsRoutes),
    TableModule,
    ButtonModule,
    ToastModule,
    FormsModule

  ],
  declarations : [
    CoursierComponent,
  ]
})
export class CoursierLayoutModule {}
