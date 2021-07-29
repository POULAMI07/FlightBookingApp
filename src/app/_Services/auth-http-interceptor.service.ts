import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  token: any = ""
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');

      req = req.clone({
        /*setHeaders: {
          Authorization: this.token
        }*/
        //headers:req.headers.set('Authorization',this.token)
        headers: req.headers.set('Authorization', this.token.replace('"', ''))
      });
    }
    return next.handle(req);

  }
}
