import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginSerService } from './_Services/login-ser.service';
import { AuthGuard } from './auth.guard';
import { ManageAirlinesComponent } from './admin/manage-airlines/manage-airlines.component';
import { FlightComponent } from './flight/flight.component';
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
    FlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginSerService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
