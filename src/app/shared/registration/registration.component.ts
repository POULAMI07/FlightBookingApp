import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  RegForm: FormGroup;

  error_messages = {
    'fname': [
      { type: 'required', message: 'First Name is required.' },
    ],

    'lname': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'phnum': [
      { type: 'required', message: 'Phone Number.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password should be of 8 characters.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password should be of 8 characters.' }
    ],
  }

  constructor(
    public RegformBuilder: FormBuilder
  ) {
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
      phnum: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      password2: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
    }, { 
      validators: this.passwordMatch.bind(this)
    });
  }
   passwordMatch(formGroup: FormGroup) {
     console.log(this.RegForm);
    const password1  = formGroup.get('password1');
    const password2  = formGroup.get('password2');
    return password1 === password2 ? null : { passwordNotMatch: true };
  }

}
