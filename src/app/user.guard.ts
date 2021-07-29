import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSerService } from './_Services/login-ser.service';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private _authservice: LoginSerService, private _router: Router) { }
  canActivate(): boolean {
    if (this._authservice.loggedInUser()) {
      return true;
    }
    else {
      this._router.navigate(['log-in'])
      return false;
    }

  }

}
