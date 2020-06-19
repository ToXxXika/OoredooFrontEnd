import {Routes} from '@angular/router';
import {BoutiqueComponent} from '../../pages/boutique/boutique.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';

export const BoutiqueLayoutRoutes : Routes = [
  { path: 'boutique', component:BoutiqueComponent},
  { path: 'user-profile', component: UserProfileComponent}
]
