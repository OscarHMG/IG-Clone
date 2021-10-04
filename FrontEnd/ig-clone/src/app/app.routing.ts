import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { TabComponentComponent } from './components/pages/tab-component/tab-component.component';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: '', component: TabComponentComponent, canActivate : [AuthGuard], pathMatch: 'full' }

]


export const appRoutingModule = RouterModule.forRoot(routes);