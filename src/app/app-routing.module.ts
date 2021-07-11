import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ManageAirlinesComponent } from './admin/manage-airlines/manage-airlines.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'log-in', component:  LoginComponent},
  { path: 'admin', 
    component:  AdminComponent,
    children: [
      {
        path: 'Manage-Airlines',
       component: ManageAirlinesComponent,
       canActivate: [AuthGuard]
      }
    ]
  },
  { path: 'user', component:  UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,HomeComponent]