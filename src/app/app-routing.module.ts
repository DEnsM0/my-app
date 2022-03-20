import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LibraryComponent } from './library/library.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { AuthCheck } from './shared/services/auth-check.service';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {
    path:'', component: MainLayoutComponent, children:[
      {path:'', redirectTo:'/',pathMatch:'full'},
      {path:'', component:HomePageComponent, canActivate:[AuthCheck]},
      {path:'library', component:LibraryComponent, canActivate:[AuthCheck]},
      {path:'friends', component:FriendsComponent, canActivate:[AuthCheck]},
      {path:'profile', component:ProfileComponent, canActivate:[AuthCheck]}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
