import { Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private repository: AuthRepositoryService) { }

    private subject = new ReplaySubject<User>();
    loggedInUser$: Observable<User> = this.subject.asObservable();
    loggedInuser: User;
    
    getById(id: number) : Observable<User> {
        return this.repository.getById(id);
    }

    login(login: UserLogin) : Observable<boolean> {
        return this.repository.login(login)
        .pipe(
            //tap((x:User) => {}),
            map((x:User) => {
                if(x !== null) {
                    this.loggedInuser = x;
                    this.subject.next(this.loggedInuser);
                    return true;
                }
                else {
                    return false;
                }
        }),
        catchError( err => {throw(err);})
        );
    }

    public hasRight(entityType: string, accessType: string) {
        var exist = this.loggedInuser.roles.filter(obj => {
            return obj.entityType === entityType && obj.accessType === accessType;
          });

        var isAdmin = this.loggedInuser.userType === "Admin";
         return isAdmin || exist.length > 0;
    }
  }