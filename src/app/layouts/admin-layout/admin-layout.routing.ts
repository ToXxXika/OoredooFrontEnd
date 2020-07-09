import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import {RegisterComponent} from "../../pages/register/register.component";
import {TransfertComponent} from "../../pages/transfert/transfert.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'register',       component: RegisterComponent },
    { path:'Transfert',     component:TransfertComponent}
];
