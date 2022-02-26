import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileInfoComponent } from './pages/edit-profile-info/edit-profile-info.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'/register',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileInfoComponent},
  {path:'edit-profile',component:EditProfileInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
