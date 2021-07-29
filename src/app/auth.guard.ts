import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSerService } from './_Services/login-ser.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authservice: LoginSerService, private _router: Router) { }
  canActivate(): boolean {
    if (this._authservice.loggedInAdmin()) {
      return true;
    }
    else {
      this._router.navigate(['log-in'])
      return false;
    }

  }

}
