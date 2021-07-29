import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSerService } from 'src/app/_Services/login-ser.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  RegForm: FormGroup;
  errorMessage = "";
  userid = ""
  error_messages = {
    'fname': [
      { type: 'required', message: 'First Name is required.' },
    ],

    'lname': [
      { type: 'required', message: 'Last Name is required.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],

    'password1': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password should be of 8 characters.' }
    ]
  }

  constructor(private login: LoginSerService, public RegformBuilder: FormBuilder, private router: Router) {
    this.RegForm = this.RegformBuilder.group({
      fname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ]))
    });
  }
  createUser() {
    let user = {
      "name": this.RegForm.value.fname + " " + this.RegForm.value.lname,
      "email": this.RegForm.value.email,
      "password": this.RegForm.value.password1,
      "roleId": 2
    }
    this.login.registrationUser(user)
      .subscribe((res: any) => {
        console.log(res)
        console.log("Successful")
        this.router.navigate(["/log-in"]);

      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
}
