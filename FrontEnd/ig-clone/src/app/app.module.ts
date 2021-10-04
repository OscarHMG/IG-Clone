import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { appRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule} from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { TabComponentComponent } from './components/pages/tab-component/tab-component.component';
import { PostComponentComponent } from './components/post-component/post-component.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { ReactionComponentComponent } from './components/reaction-component/reaction-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupCommentsComponent } from './components/popups-components/popup-comments/popup-comments.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PopupNewcommentComponent } from './components/popups-components/popup-newcomment/popup-newcomment.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    TabComponentComponent,
    PostComponentComponent,
    ReactionComponentComponent,
    PopupCommentsComponent,
    PopupNewcommentComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    appRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  exports:[
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
