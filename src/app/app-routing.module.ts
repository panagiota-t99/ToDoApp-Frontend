import {NgModule} from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {HomeItemsComponent} from "./components/home-items/home-items.component";
import {LogsComponent} from "./components/logs/logs.component";
import {HomeNavigationComponent} from "./components/home-navigation/home-navigation.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeNavigationAdminComponent} from "./components/home-navigation-admin/home-navigation-admin.component";
import {UsersComponent} from "./components/users/users.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home/admin',
    component: HomeNavigationAdminComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'logs',
        component: LogsComponent
      },
      {
        path: 'items',
        component: HomeItemsComponent
      },

    ]
  },
  {
    path: 'home/user',
    component: HomeNavigationComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },

      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: 'items',
        component: HomeItemsComponent
      },
    ]
  },


  {
    path: 'register',
    component: RegisterComponent
  }


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
