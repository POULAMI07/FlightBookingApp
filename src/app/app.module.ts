import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginSerService } from './_Services/login-ser.service';
import { AuthGuard } from './auth.guard';
import { ManageAirlinesComponent } from './admin/manage-airlines/manage-airlines.component';
import { FlightComponent } from './flight/flight.component';
import { ManageDiscountsComponent } from './admin/manage-discounts/manage-discounts.component';
import { ManageScheduleComponent } from './admin/manage-schedule/manage-schedule.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BookFlightComponent } from './user/book-flight/book-flight.component';
import { ManageBookingComponent } from './user/manage-booking/manage-booking.component';
import { HistoryComponent } from './user/history/history.component';
import { PassengerDetailsComponent } from './user/passenger-details/passenger-details.component';
import { DatePipe } from '@angular/common';
import { AuthHttpInterceptorService } from './_Services/auth-http-interceptor.service';
import { ReportComponent } from './admin/report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    routingComponents,
    AdminComponent,
    UserComponent,
    RegistrationComponent,
    ManageAirlinesComponent,
    FlightComponent,
    ManageDiscountsComponent,
    ManageScheduleComponent,
    BookFlightComponent,
    ManageBookingComponent,
    HistoryComponent,
    PassengerDetailsComponent,
    ReportComponent
    //NgxMaterialTimepickerModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule
  ],
  providers: [LoginSerService, AuthGuard, DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
