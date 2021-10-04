import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { TabComponentComponent } from './components/pages/tab-component/tab-component.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: '', component: TabComponentComponent, canActivate : [AuthGuard], pathMatch: 'full' },
    { path: 'register', component: RegisterPageComponent},
    { path: 'profile', component: ProfilePageComponent}

]


export const appRoutingModule = RouterModule.forRoot(routes);