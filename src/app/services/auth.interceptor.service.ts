import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const user = this.authService.loggedUser;
        if(!user) return next.handle(req);

        const modifiedReq = req.clone({
            headers: new HttpHeaders().set('authorization', `bearer ${ user.token }`)
          }); 

          return next.handle(modifiedReq)
            .pipe(catchError(err => {
                // onError
                console.log(err);
                if (err instanceof HttpErrorResponse) {
                    console.log(err.status);
                    console.log(err.statusText);
                    if (err.status === 401) {
                        window.location.href = "/login";
                    }
                }
                return Observable.throw(err);
            }));
        // return next.handle(modifiedReq).pipe(
        //     tap(evt => {
        //         if (evt instanceof HttpResponse) {
        //           //console.log('---> status:', evt.status);
        //           //console.log('---> filter:', req.headers.get('authorization'));
        //         }
        //       })
        // );
    }
}
