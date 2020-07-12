import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import {TestToastComponent} from '../../test-toast/test-toast.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
  {path:'test', component:TestToastComponent}

];
