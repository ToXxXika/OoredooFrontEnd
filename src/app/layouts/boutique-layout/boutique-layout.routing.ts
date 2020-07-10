import {Routes} from '@angular/router';
import {BoutiqueComponent} from '../../pages/boutique/boutique.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {CommandeComponent} from '../../pages/commande/commande.component';
import {ProduitComponent} from '../../pages/produit/produit.component';
import {DetailcommandeComponent} from '../../pages/detailcommande/detailcommande.component';

export const BoutiqueLayoutRoutes : Routes = [
  { path: 'user-profile', component: UserProfileComponent},
  {path : 'commande', component: CommandeComponent},
  {path: 'produits', component:ProduitComponent},
  {path: 'detailcommande', component:DetailcommandeComponent}
]
