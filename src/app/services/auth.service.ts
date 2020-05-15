import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthUser, tokenExpiresInSec } from '../models/auth-user';
import { UserLogin } from '../models/user-login';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private repository: AuthRepositoryService,
        private router: Router) { }

    private subject = new ReplaySubject<AuthUser>();
    loggedInUser$: Observable<AuthUser> = this.subject.asObservable();
    loggedUser: AuthUser;
    private tokenExpirationTimer: any;
    getById(id: number) : Observable<AuthUser> {
        return this.repository.getById(id);
    }

    login(login: UserLogin) : Observable<boolean> {
        return this.repository.login(login)
        .pipe(
            //tap((x:User) => {}),
            map((x:AuthUser) => {
                if(x !== null) {
                    debugger;
                    this.loggedUser = x;
                    this.subject.next(this.loggedUser);
                    localStorage.setItem('UserData', JSON.stringify(this.loggedUser));
                    this.autoLogout();
                    return true;
                }
                else {
                    return false;
                }
        }),
        catchError( err => {throw(err);})
        );
    }

    refreshLoggedInUser() {
        this.subject.next(this.loggedUser);
        localStorage.setItem('UserData', JSON.stringify(this.loggedUser));
    }

    autoLogin() {
        const userData: AuthUser = JSON.parse(localStorage.getItem('UserData'));
        if(!userData) {
            return;
        }
        if(userData.token){
            this.loggedUser = userData;
            this.subject.next(this.loggedUser);
            this.autoLogout();
        }
    }

    logout(){
        this.loggedUser = null;
        this.subject.next(this.loggedUser);
        
        localStorage.removeItem('UserData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

        this.router.navigate(['/login'])
    }

    autoLogout() {
        var seconds = tokenExpiresInSec(this.loggedUser);
        console.log(seconds);
        this.tokenExpirationTimer = setTimeout(
            () => {this.logout()}, 
            seconds * 1000);
    }

    public hasRight(entityType: string, accessType: string) {
        var exist = this.loggedUser.roles.filter(obj => {
            return obj.entityType === entityType && obj.accessType === accessType;
          });

        var isAdmin = this.loggedUser.userType === "Admin";
         return isAdmin || exist.length > 0;
    }
  }