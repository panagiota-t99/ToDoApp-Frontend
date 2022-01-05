import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from "@angular/material/icon";
import { HomeComponent } from './components/home/home.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import { HomeItemsComponent } from './components/home-items/home-items.component';
import { LogsComponent } from './components/logs/logs.component';
import { HomeNavigationComponent } from './components/home-navigation/home-navigation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { HomeNavigationAdminComponent } from './components/home-navigation-admin/home-navigation-admin.component';
import { UsersComponent } from './components/users/users.component';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import {MatSelectModule} from "@angular/material/select";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DialogComponent,
    DialogDeleteComponent,
    HomeItemsComponent,
    LogsComponent,
    HomeNavigationComponent,
    HomeNavigationAdminComponent,
    UsersComponent,
    DialogUserComponent,
  ],
  entryComponents: [DialogComponent],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatDialogModule,
        MatToolbarModule,
        MatSelectModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
