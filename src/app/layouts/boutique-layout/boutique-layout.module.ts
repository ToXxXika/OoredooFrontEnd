import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BoutiqueLayoutRoutes} from './boutique-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BoutiqueComponent} from '../../pages/boutique/boutique.component';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {CoursierComponent} from '../../pages/coursier/coursier.component';
import {CommandeComponent} from '../../pages/commande/commande.component';
import {ProduitComponent} from '../../pages/produit/produit.component';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import { SplitButtonModule} from 'primeng';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar'
import {DetailcommandeComponent} from '../../pages/detailcommande/detailcommande.component';


@NgModule({
    imports: [
        RouterModule.forChild(BoutiqueLayoutRoutes),
        ReactiveFormsModule,
        ToastModule,
        InputTextModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        ButtonModule,
        DropdownModule,
        TableModule,
        CommonModule,
        FormsModule,
        DataViewModule,
        DialogModule,
        SplitButtonModule,
        InputNumberModule,
        CalendarModule


    ],
  declarations : [
    BoutiqueComponent,
    CoursierComponent,
    CommandeComponent,
    ProduitComponent,
    DetailcommandeComponent
  ]
})
export class BoutiqueLayoutModule {}
