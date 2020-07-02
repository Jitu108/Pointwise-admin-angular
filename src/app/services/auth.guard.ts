import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

type AuthGuardReturnType =
    boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate =
        (route: ActivatedRouteSnapshot, router: RouterStateSnapshot): AuthGuardReturnType => {
            return this.authService.loggedInUser$.pipe(map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                //return this.router.createUrlTree(['/login']);
                return this.router.createUrlTree(['/login']);
            }));
        }
}