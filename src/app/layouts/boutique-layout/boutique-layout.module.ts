import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BoutiqueLayoutRoutes} from './boutique-layout.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {BoutiqueComponent} from '../../pages/boutique/boutique.component';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  imports : [
    RouterModule.forChild(BoutiqueLayoutRoutes),
     ReactiveFormsModule,
     ToastModule,
     InputTextModule,
     PanelModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    DropdownModule


  ],
  declarations : [
    BoutiqueComponent
  ]
})
export class BoutiqueLayoutModule {}
