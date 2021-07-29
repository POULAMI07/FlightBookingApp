import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ManageAirlinesComponent } from './admin/manage-airlines/manage-airlines.component';
import { ManageDiscountsComponent } from './admin/manage-discounts/manage-discounts.component';
import { ManageScheduleComponent } from './admin/manage-schedule/manage-schedule.component';
import { ReportComponent } from './admin/report/report.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { UserGuard } from './user.guard';
import { BookFlightComponent } from './user/book-flight/book-flight.component';
import { HistoryComponent } from './user/history/history.component';
import { ManageBookingComponent } from './user/manage-booking/manage-booking.component';
import { PassengerDetailsComponent } from './user/passenger-details/passenger-details.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'log-in', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'Manage-Airlines',
        component: ManageAirlinesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Manage-discount',
        component: ManageDiscountsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Manage-schedule',
        component: ManageScheduleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Reports',
        component: ReportComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'Book-flight',
        component: BookFlightComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'Manage-booking',
        component: ManageBookingComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'History',
        component: HistoryComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'Passenger-Details/:schlid',
        component: PassengerDetailsComponent,
        canActivate: [UserGuard]
      },
    ]
  },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, RegistrationComponent]