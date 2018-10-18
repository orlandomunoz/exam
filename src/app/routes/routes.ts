import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from '../guards/auth.guard';
import { NotloggedinGuard } from '../guards/notloggedin.guard';

export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' }
        ],
        canActivate: [ AuthGuard ]
    },

    {
      path: 'login',
      component: LoginComponent,
      canActivate: [ NotloggedinGuard ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }

];
