import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const user = this.authService.loggedInuser;
        if(!user) return next.handle(req);

        const modifiedReq = req.clone({
            headers: new HttpHeaders().set('authorization', `bearer ${ user.token }`)
          }); 

        return next.handle(modifiedReq).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                  //console.log('---> status:', evt.status);
                  //console.log('---> filter:', req.headers.get('authorization'));
                }
              })
        );
    }
}
