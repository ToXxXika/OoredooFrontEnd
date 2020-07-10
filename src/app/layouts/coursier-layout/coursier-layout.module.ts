import {TableModule} from 'primeng/table';
import {CoursierComponent} from '../../pages/coursier/coursier.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoursierLayoutsRoutes} from './coursier-layout.routing';
import {ButtonModule} from 'primeng';



@NgModule({
  imports: [
    RouterModule.forChild(CoursierLayoutsRoutes),
    TableModule,
    ButtonModule

  ],
  declarations : [
    CoursierComponent,
  ]
})
export class CoursierLayoutModule {}
